const express = require('express');
const course = express.Router();
const {
    createCourse,
    getCourseByID,
    getCourseByCategory,
    getAllCourse,
    updateCourse,
    deleteCourseByID,
    deleteAllCourse,
    submitQuiz
} = require('../controllers/course');
const upload = require('../middleware/uploader');

course
    // uploading array of files using multer
    .post('/create', upload.array('file', 4), createCourse)
    .get('/get/id/:id', getCourseByID)
    .get('/get/category/:category', getCourseByCategory)
    .get('/get/all', getAllCourse)
    .put('/update', upload.array('file', 4), updateCourse)
    .delete('/delete/id/:id', deleteCourseByID)
    .delete('/delete/all', deleteAllCourse)
    .post('/quiz/submit', submitQuiz);

module.exports = course;