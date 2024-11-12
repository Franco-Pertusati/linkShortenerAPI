// En lugar de inicializar Firebase, usa un objeto en memoria
const db = new Map();

module.exports = {
  // Función para guardar una URL en la "base de datos" en memoria
  saveUrl: (shortCode, originalUrl) => {
    db.set(shortCode, originalUrl);
  },

  // Función para obtener una URL usando su código
  getUrl: (shortCode) => {
    return db.get(shortCode);
  },

  // Función opcional para eliminar URLs (si fuera necesario)
  deleteUrl: (shortCode) => {
    db.delete(shortCode);
  }
};
