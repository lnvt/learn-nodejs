const Course = require('../models/Course');
const { mogooseToObject } = require('../../util/mongoose');

class CourseController {
    showDetail(req, res, next) {
        // req.query.name: Query paramether
        // req.body.name: POST method

        //[GET] /course/:slug
        // res.send('COURSE DETAIL! - ' + req.params.slug);

        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                // res.json(course);
                res.render('courses/show', {
                    course: mogooseToObject(course),
                });
            })
            .catch(next);
    }

    //[GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /course/store
    store(req, res, next) {
        //res.json(req.body)
        const formData = req.body;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});

        //res.send('COURSE SAVED!')
    }

    //[GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mogooseToObject(course),
                }),
            )
            .catch(next);
    }

    //GET, POST, PUT, PATCH, DELETE, OPTION, HEAD

    //[PUT] /course/:id
    update(req, res, next) {
        //res.json(req.body);

        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /course/:id/force
    force(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /course/handle-form-actions
    handleFormActions(req, res, next) {
        //res.json(req.body);

        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ message: 'Action is invalid!' });
        }
    }
}

module.exports = new CourseController();
