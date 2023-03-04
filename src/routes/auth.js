const express = require('express');
const auth = express.Router();
const {
    register,
    login,
    resetPassword
} = require('../controllers/auth');

// register route
auth.post('/register', register);
// login
auth.post('/login', login);
// reset password route
auth.post('/reset-password', resetPassword);

module.exports = {
    auth
};