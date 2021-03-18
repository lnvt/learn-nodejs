const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const path = require('path');
const port = 3000;

const route = require('./routes');

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
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
