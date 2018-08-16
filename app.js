require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');
const db = require('./dataSource/db');

app.use(bodyParser.json());

db.connect();

router(app);

module.exports = app;
