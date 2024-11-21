const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/', urlRoutes);

module.exports = app;
