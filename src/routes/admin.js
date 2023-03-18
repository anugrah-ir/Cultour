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
    .delete('/remove', removeAdmin)
    .get('/payment/get/:id', getPayment)
    .post('/payment/approve/:id', approvePayment);

module.exports = admin;