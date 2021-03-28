const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

//newsController.index

router.post('/handle-form-actions', courseController.handleFormActions); //HandleForm actions checkbox & submit

router.delete('/:id', courseController.destroy); // delete
router.delete('/:id/force', courseController.force); // delete force
router.put('/:id', courseController.update); // edit
router.get('/:id/edit', courseController.edit);
router.get('/create', courseController.create);
router.post('/store', courseController.store); // create
router.get('/:slug', courseController.showDetail);
router.patch('/:id/restore', courseController.restore); // restore

module.exports = router;
