const express = require('express');
const admin = express.Router();
const {
    addAdmin,
    getAllAdmin,
    removeAdmin,
    getPayment,
    approvePayment
} = require('../controllers/admin');;

admin
    .post('/add', addAdmin)
    .get('/get/all', getAllAdmin)
    .delete('/delete', removeAdmin)
    .get('/payment/get', getPayment)
    .post('/payment/approve', approvePayment);

module.exports = admin;