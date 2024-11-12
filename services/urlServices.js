const db = require('../firebase.js'); // Asumiendo que `firebase.js` es el archivo con la estructura en memoria

const saveUrl = async (shortCode, originalUrl) => {
  db.saveUrl(shortCode, originalUrl);
};

const getUrl = async (shortCode) => {
  return db.getUrl(shortCode);
};

module.exports = {
  saveUrl,
  getUrl
};
