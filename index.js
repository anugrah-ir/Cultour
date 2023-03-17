require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/index');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Synchronize database every re-deploy
sequelize.sync({ alter: true });

// API route
app.use('/', routes);

app.listen(port);
console.log('Server Running...');