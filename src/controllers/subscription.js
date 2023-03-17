const { success, error } = require('../utils/response');
const users = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {

    subscribe: async (req, res) => {
        try {
            const data = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
            const user = await users.findOne({ where: { email : data.email } });
            await user.update({
                isSubscribed: true
            });

            return success(res, 400, true, "Subscription success");
        }
        catch (err) {
            return error(res, 400, false, err);
        }
    }

}