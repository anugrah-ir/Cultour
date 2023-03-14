require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/index');
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['https://cultour1.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}));


// Synchronize database every new commit
// Replace with 'sequelize.sync({ force: true })' to delete all existing data in database
sequelize.sync({ alter: true });

// API route
app.use('/', routes);

app.listen(port);
console.log('Server Running...');