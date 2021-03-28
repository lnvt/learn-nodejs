const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
const route = require('./routes');

//Sort Middleware
const SortMiddleware = require('./app/middlewares/SortMiddleWare');

//Connect DB
const db = require('./config/db');
db.connect();

//Middle ware
app.use(methodOverride('_method'));
//app.use(testMiddleWare); //http://localhost:3000/?fashion=giaydep
app.use(SortMiddleware);

//Static file: http://localhost:3000/img/logo.png
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//XMLHttpRequest, fetch, axios, ...

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <span class="${icon}"></span>
                        </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//console.log('PATH: ', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

//Route
// app.get('/', (request, response) => {
//   response.render('home');
// });

//Divided 2: Controller & route
// app.get('/news', (req, res) => {
//   console.log(req.query.q);
//   res.render('news');
// });

// app.get('/search', (req, res) => {
//   res.render('search');
// });

// app.post('/search', (req, res) => {

//   //console.log(req.query.q); Query Parameters

//   console.log(req.body);

//   res.send('');
// });

//Middleware
app.get(
    '/middleware',
    function (req, res, next) {
        if (['giaydep', 'quanao'].includes(req.query.fashion)) {
            req.brand = 'MLB';
            return next();
        }
        res.status(403).json({
            message: 'Access denied!',
        });
    },
    function (req, res, next) {
        res.json({
            message: 'Middleware!',
            brand: req.brand,
        });
    },
);

function testMiddleWare(req, res, next) {
    if (['giaydep', 'quanao'].includes(req.query.fashion)) {
        req.brand = 'MLB';
        return next();
    }
    res.status(403).json({
        message: 'Access denied!',
    });
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
