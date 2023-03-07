require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const users = require('../models/user');
const { success, error } = require('../utils/response');

module.exports = {

    register: async (req,res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await users.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
    
            return success(res, 200, true, "Register Successful", token);
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },
    
    login: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });

            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET)
                
                return success(res, 200, true, "Login successful", token);
            }
            else {
                return error(res, 400, false, "Invalid email or password");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },
    
    resetPassword: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });
            if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                await user.update({ password: req.body.newPassword })
    
                return success(res, send, true, "Password has been updated");
            }
            else {
                return error(res, 400, false, "Invalid email or password");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    }

}