const express = require('express');
const routes = express.Router();
const auth = require('./auth');
const user = require('./user');
const course = require('./course');
const admin = require('./admin');

routes
    .use('/auth', auth)
    .use('/user', user)
    .use('/course', course)
    .use('/admin', admin);

module.exports = routes;