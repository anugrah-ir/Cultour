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
course
    .post('/create', createCourse)
    .get('/get/id/:id', getCourse)
    .get('/get/category/:category', getCourseByCategory)
    .get('/get/all', getAllCourse)
    .put('/update', updateCourse)
    .delete('/delete', deleteCourse)
    .delete('/delete/all', deleteAllCourse);

module.exports = course;