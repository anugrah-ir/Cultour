const express = require('express');
const user = express.Router();
const {
    getUser,
    getAllUser,
    updateUser,
    deleteUser,
    deleteAllUser
} = require('../controllers/user');

user
    .get('/get/', getUser)
    .get('/get/all', getAllUser)
    .put('/update', updateUser)
    .delete('/delete', deleteUser)
    .delete('/all/delete', deleteAllUser);

module.exports = user;