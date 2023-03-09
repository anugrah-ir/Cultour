require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const users = require('../models/user');
const { success, error } = require('../utils/response');

module.exports = {

    register: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });

            if (user === null) {
                if (emailValidator.validate(req.body.email) === true) {
                    const schema = new passwordValidator();
                    schema
                        .is().min(8)
                        .has().lowercase()
                        .has().uppercase()
                        .has().digits()
                        .has().symbols()
                        .has().not().spaces();
                    
                    if (schema.validate(req.body.password) === true) {
                        const hashedPassword = await bcrypt.hash(req.body.password, 10);
                        const user = await users.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hashedPassword,
                            verified: false,
                            subscribed: false, 
                            admin: false
                        });
    
                        const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
        
                        return success(res, 200, true, "Register Successful", token);
                    }
                    else {
                        return error(res, 400, false, "Password must have at least 8 characters with lowercase, uppercase, number and symbol");
                    }
                }
                else {
                    return error(res, 400, false, "Invalid email address");
                }
            }
            else {
                return error(res, 400, false, "The email is already registered");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },
    
    login: async (req,res) => {
        try {
            if (emailValidator.validate(req.body.email) === true) {
                const user = await users.findOne({ where: { email : req.body.email } });
                if (user !== null) {
                    if (await bcrypt.compare(req.body.password, user.password)) {
                        const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
                    
                        return success(res, 200, true, "Login successful", token);
                    }
                    else {
                        return error(res, 400, false, "Invalid email or password");
                    }
                }
                else {
                    return error(res, 400, false, "The email is not registered");
                }
            }
            else {
                return error(res, 400, false, "Invalid email address");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    }

}