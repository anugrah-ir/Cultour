require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const users = require('../models/user');


module.exports = {

    register: async (req,res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await users.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });
    
            res.status(201).send({
                "status": "success",
                "message": "Register Successfull"
            });
        }
        catch (err) {
            res.status(500).send({
                "status": "error",
                "message": err.message
            });
        }
    },
    
    login: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });

            if (await bcrypt.compare(req.body.password, user.password)) {
                const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).send({
                    "status": "success",
                    "message": "Login successfull",
                    "data": {
                        "accessToken": accessToken
                    }
                });
            }
            else {
                res.status(400).send({
                    "status": "error",
                    "Message": "Invalid Credentials"
                });
            }
        }
        catch (err) {
            res.status(500).send({
                "status": "error",
                "message": err.message
            });
        }
    },
    
    resetPassword: async (req,res) => {
        try {
            const user = await users.findOne({ where: { email : req.body.email } });
            if (await bcrypt.compare(req.body.oldPassword, user.password)) {
                await user.update({ password: req.body.newPassword })
    
                res.status(200).send({
                    "status": "success",
                    "message": "Password Successfully Changed"
                });
            }
            else {
                res.status(401).send({
                    "status": "error",
                    "Message": "Wrong Password"
                });
            }
        }
        catch (err) {
            res.status(500).send({
                "status": "error",
                "message": err.message
            });
        }
    }

}