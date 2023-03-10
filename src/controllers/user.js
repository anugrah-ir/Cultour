require('dotenv').config();
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const jwt = require("jsonwebtoken");
const users = require('../models/user');
const { success, error } = require('../utils/response');

module.exports = {

    updatePassword: async (req,res) => {
        try {
            if (emailValidator.validate(req.body.email) === true) {
                const user = await users.findOne({ where: { email : req.body.email } });

                if (await bcrypt.compare(req.body.password, user.password)) {
                    const schema = new passwordValidator();
                    schema
                        .is().min(8)
                        .has().lowercase()
                        .has().uppercase()
                        .has().digits()
                        .has().symbols()
                        .has().not().spaces();

                    if (schema.validate(req.body.password) === true) {
                        const newPassword = await bcrypt.hash(req.body.newPassword, 10);
                        await user.update({ password: newPassword });
                        const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
    
                        return success(res, 200, true, "Password has been updated", token);
                    }
                    else {
                        return error(res, 400, false, "Password must have at least 8 characters with lowercase, uppercase, number and symbol");
                    }
                }
                else {
                    return error(res, 400, false, "Invalid email or password");
                }
            }
            else {
                return error(res, 400, false, "Invalid email address");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },

    deleteUser: async (req,res) => {
        try {
            if (emailValidator.validate(req.body.email) === true) {
                const user = await users.findOne({ where: { email : req.body.email } });

                if (await bcrypt.compare(req.body.password, user.password)) {
                    if (req.body.password = req.body.confirmPassword) {
                        await user.destroy();
                    
                        return success(res, 200, true, "User has been deleted");
                    }
                    else {
                        return error(res, 400, false, "Password did not match");
                    }
                }
                else {
                    return error(res, 400, false, "Invalid email or password");
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

};