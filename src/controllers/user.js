require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const users = require('../models/user');
const { success, error } = require('../utils/response');

module.exports = {

    updatePassword: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });

            if (await bcrypt.compare(req.body.password, user.password)) {
                const newPassword = await bcrypt.hash(req.body.newPassword, 10);
                await user.update({ password: newPassword });
                const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
    
                return success(res, 200, true, "Password has been updated", token);
            }
            else {
                return error(res, 400, false, "Invalid email or password");
            }
        }
        catch (err) {
            return error(res, 500, false, err);
        }
    },

    deleteUser: async (req,res) => {
        try {
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
        catch (err) {
            return error(res, 500, false, err);
        }
    }

}