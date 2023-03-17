const express = require('express');
const subscription = express.Router();
const {
    subscribe
} = require('../controllers/subscription');
const upload = require('../middleware/uploader');

subscription
    .post('/subscribe', upload.single('buktiPembayaran'), subscribe);

module.exports = subscription;