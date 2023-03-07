const express = require('express');
const user = express.Router();
const {
    updatePassword,
    deleteUser
} = require('../controllers/user');

user
    .put('/password/update', updatePassword)
    .delete('/delete', deleteUser);

module.exports = user;