require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const { routes } = require('./src/routes/index');
const port = process.env.PORT;
const app = express();
app.use(express.json());

// Synchronize user databases
// Replace with 'sequelize.sync({ force: true })' to delete all existing users
sequelize.sync({ force: true });

// API route
app.use('/api', routes);

app.listen(port);