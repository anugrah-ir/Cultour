require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/index');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files in "/uploads" folder
app.use(express.static('uploads'));

// API route
app.use('/', routes);

// Synchronize database every re-deploy
sequelize.sync({ force: true });

app.listen(port);
console.log('Server Listening on Port', port);