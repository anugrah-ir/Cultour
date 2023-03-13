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
            if (emailValidator.validate(req.body.email) === false ) throw "Invalid email address";

            const user = await users.findOne({ where: { email : req.body.email } });
            if (user === null) throw "The email is not registered";
            
            if (await bcrypt.compare(req.body.password, user.password) === false) throw "Old password is wrong";

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
            await user.update({ password: hashedPassword });

            const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);

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
    }

};