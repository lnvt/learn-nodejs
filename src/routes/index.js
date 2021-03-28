const meRouter = require('./me');
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');

function route(app) {
    // app.get('/', (request, response) => {
    //      response.render('home');
    // });

    // app.get('/news', (req, res) => {
    //     console.log(req.query.q);
    //      res.render('news');
    // });

    app.use('/me', meRouter);
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);

    // app.get('/search', (req, res) => {
    //     res.render('search');
    // });

    // app.post('/search', (req, res) => {

    //     //console.log(req.query.q); Query Parameters

    //     console.log(req.body);

    //     res.send('');
    // });
}

module.exports = route;
