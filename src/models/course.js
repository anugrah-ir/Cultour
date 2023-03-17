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
    }

});

module.exports = courses;