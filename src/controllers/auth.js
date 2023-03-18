require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const users = require('../models/user');
const { success, error } = require('../handler/response');

module.exports = {

    register: async (req,res) => {
        try {
            if (emailValidator.validate(req.body.email) === false ) throw "Invalid email address";

            const user = await users.findOne({ where: { email : req.body.email } });
            if (user !== null) throw "The email is already registered";
            
            const password = new passwordValidator();
            password
                .is().min(8)
                .has().lowercase()
                .has().uppercase()
                .has().digits()
                .has().symbols()
                .has().not().spaces();     
            if (password.validate(req.body.password) === false) throw "Password must have at least 8 characters with lowercase, uppercase, numbers, symbols, and no spaces";
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await users.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                isVerified: false,
                isSubscribed: false, 
                isAdmin: false
            });
            const token = jwt.sign({ id: newUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });

            return success(res, 200, true, "Register Successful", token);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    },
    
    login: async (req,res) => {
        try {
            if (emailValidator.validate(req.body.email) === false) throw "Invalid email address";

            const user = await users.findOne({ where: { email : req.body.email } });
            if (user === null) throw "The email is not registered";

            if (await bcrypt.compare(req.body.password, user.password) === false) throw "Invalid email or password";

            const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });

            return success(res, 200, true, "Login successful", token);
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    }

};