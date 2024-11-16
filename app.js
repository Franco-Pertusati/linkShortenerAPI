const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/', urlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
