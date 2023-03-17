const express = require('express');
const routes = express.Router();
const auth = require('./auth');
const user = require('./user');
const course = require('./course');
const subscription = require('./subscription');

routes
    .use('/auth', auth)
    .use('/user', user)
    .use('/course', course)
    .use('/subscription', subscription);

module.exports = routes;