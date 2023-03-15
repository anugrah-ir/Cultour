require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/index');
const port = process.env.PORT;
const app = express();

app.use(express.json());

// Synchronize database every new commit
// Replace with 'sequelize.sync({ force: true })' to delete all existing data in database
sequelize.sync({ alter: true });

// API route
app.use('/', routes);

app.listen(port);
console.log('Server Running...');