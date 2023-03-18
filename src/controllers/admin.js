const jwt = require('jsonwebtoken');
const users = require('../models/user');
const payments = require('../models/payment');
const { success, error } = require('../handler/response');

module.exports = {

    addAdmin: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await users.findOne({ where: { id: data.id } });
            if (user === null) throw "Could not find user";

            await user.update({
                isAdmin: true
            });

            return success(res, 200, true, "New admin added");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
        
    },

    getAllAdmin: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await users.findOne({ where: { id: data.id } });
            if (user.isAdmin === false) throw "Anauthorized";

            const admin = await users.findAll({ where: { isAdmin: true } });
            if (user === null) throw "Could not find admin";

            return success(res, 200, true, "Admin found", admin);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    removeAdmin:async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await users.findOne({ where: { id: data.id } });
            if (user === null) throw "Could not find user";

            await user.update({
                isAdmin: false
            });

            return success(res, 200, true, "New admin added");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    getPayment: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const admin = await users.findOne({ where: { id: data.id } });
            if (admin === null) throw "Could not find user as admin";

            if (admin.isAdmin === false) throw "Unauthorized";

            const payment = await payments.findAll({ where: { userId: req.params['id'] } });
            if (payment === null) throw "Could not find payment from this user";

            return success(res, 200, true, "Payment found for this user", payment);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    approvePayment: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const admin = await users.findOne({ where: { id: data.id } });
            if (admin === null) throw "Could not find user as admin";

            if (admin.isAdmin === false) throw "Unauthorized";

            const user = await users.findAll({ where: { id: req.params['id'] } });
            if (user === null) throw "Could not find user";

            await user.update({
                isSubscribed: true
            });

            return success(res, 200, true, "User subscription request has been aproved");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    }

};