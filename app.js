const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const allowedOrigins = [
  /https:\/\/franco-pertusati\.github\.io/,
  'http://localhost:4200'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.some(pattern => pattern.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use('/', urlRoutes);

module.exports = app;
