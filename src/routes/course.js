const express = require('express');
const course = express.Router();
const {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/course');

course
    .post('/create', createCourse)
    .get('/view', getCourse)
    .put('/update', updateCourse)
    .delete('/delete', deleteCourse);

module.exports = course;