const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors({ origin: 'http://localhost:4200' }));  // Permitir solicitudes desde localhost:4200
app.use(express.json());
app.use("/", urlRoutes);

module.exports = app;
