const Course = require('../models/Course');
const { multipleMogooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        // res.json(res.locals._sort);

        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            // res.json({message: 'Successfully!'});
            // return;
            courseQuery = courseQuery.sort({
                //name: 'asc',
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMogooseToObject(courses),
                }),
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // Course.find()
        //     .then(courses => res.render('me/stored-courses', {
        //         courses : multipleMogooseToObject(courses)
        //     }))
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMogooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
