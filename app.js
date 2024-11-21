const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', urlRoutes);

module.exports = app;
