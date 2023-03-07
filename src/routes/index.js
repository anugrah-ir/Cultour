const express = require('express');
const routes = express.Router();
const auth = require('./auth');
const user = require('./user');

routes
    .use('/auth', auth)
    .use('/user', user);

module.exports = {
    routes
};