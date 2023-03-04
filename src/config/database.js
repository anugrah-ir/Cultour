require('dotenv').config();
const Sequelize = require('sequelize');

// Connect to the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "mysql"
});

module.exports = sequelize;