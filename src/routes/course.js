const express = require('express');
const course = express.Router();
const {
    createCourse,
    getCourse,
    getCourseByCategory,
    getAllCourse,
    updateCourse,
    deleteCourse,
    deleteAllCourse
} = require('../controllers/course');
const upload = require('../middleware/uploader');

course
    .post('/create', upload.none(), createCourse)
    .get('/get/id/:id', getCourse)
    .get('/get/category/:category', getCourseByCategory)
    .get('/get/all', getAllCourse)
    .put('/update', updateCourse)
    .delete('/delete', deleteCourse)
    .delete('/delete/all', deleteAllCourse);

module.exports = course;