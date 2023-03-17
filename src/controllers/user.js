require('dotenv').config();
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const jwt = require("jsonwebtoken");
const users = require('../models/user');
const { success, error } = require('../utils/response');

module.exports = {

    getUser: async (req, res) => {
        try {
            const data = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
            const user = await users.findOne({ where: { email : data.email } });
            if (user === null) throw "User not found";

            return success(res, 200, true, "User found successfully", user);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const user = await users.findAll();
            if (user === null) throw "No users found";

            return success(res, 200, true, "Users found successfully", user);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    updateUser: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });
            if (user === null) throw "Invalid email or password";
            
            if (await bcrypt.compare(req.body.password, user.password) === false) throw "Invalid email or password";

            if (emailValidator.validate(req.body.email) === false ) throw "New email address is invalid";

            const password = new passwordValidator();
            password
                .is().min(8)
                .has().lowercase()
                .has().uppercase()
                .has().digits()
                .has().symbols()
                .has().not().spaces();     
            if (password.validate(req.body.newPassword) === false) throw "Password must have at least 8 characters with lowercase, uppercase, numbers, symbols, and no spaces";
            
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            await user.update({
                username: req.body.newUsername,
                email: req.body.newEmail,
                password: hashedPassword
            });

            const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);

            return success(res, 200, true, "Password changed successfully", token);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    deleteUser: async (req,res) => {
        try {
            if (emailValidator.validate(req.body.email) === false ) throw "Invalid email address";

            const user = await users.findOne({ where: { email : req.body.email } });
            if (user === null) throw "The email is not registered";

            if (await bcrypt.compare(req.body.password, user.password) === false) throw "Invalid email or password";

            await user.destroy();
                    
            return success(res, 200, true, "User has been deleted");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },

    deleteAllUser: async (req, res) => {
        try {
            await users.sync({ force: true });

            return success(res, 200, true, "All user has been deleted");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    }

};