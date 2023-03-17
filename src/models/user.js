const sequelize = require('../config/database');
const DataTypes = require('sequelize');

// Define the table for users
const users = sequelize.define("users", {
    
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isSubscribed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
        
});

module.exports = users;