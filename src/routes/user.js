const express = require('express');
const user = express.Router();
const {
    getUser,
    getAllUser,
    updateUser,
    deleteUser,
    deleteAllUser,
    subscribe
} = require('../controllers/user');
const upload = require('../middleware/uploader');

user
    .get('/get/', getUser)
    .get('/get/all', getAllUser)
    .put('/update', updateUser)
    .delete('/delete', deleteUser)
    .delete('/all/delete', deleteAllUser)
    // uploading single file using multer
    .post('/subscribe', upload.single('file'), subscribe);

module.exports = user;