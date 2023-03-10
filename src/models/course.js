const sequelize = require('../config/database');
const DataTypes = require('sequelize');

const courses = sequelize.define("courses", {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    category: {
        type: DataTypes.STRING,
    },
    province: {
        type: DataTypes.STRING
    }, 
    city: {
        type: DataTypes.STRING
    },
    article: {
        type: DataTypes.STRING
    },
    picture: {
        type: DataTypes.STRING
    },
    video: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});

module.exports = courses;