const sequelize = require('../config/database');
const DataTypes = require('sequelize');

// Define the table for courses
const courses = sequelize.define("courses", {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    picture: {
        type: DataTypes.STRING
    },
    video1: {
        type: DataTypes.STRING
    },
    video2: {
        type: DataTypes.STRING
    },
    video3: {
        type: DataTypes.STRING
    },
    question1: {
        type: DataTypes.JSON,
        allowNull: false
    },
    question2: {
        type: DataTypes.JSON,
        allowNull: false
    },
    question3: {
        type: DataTypes.JSON,
        allowNull: false
    },
    question4: {
        type: DataTypes.JSON,
        allowNull: false
    },
    question5: {
        type: DataTypes.JSON,
        allowNull: false
    }

});

module.exports = courses;