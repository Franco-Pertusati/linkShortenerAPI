const db = require("../config/firebase");

const saveUrl = async (shortCode, originalUrl) => {
  await db.collection("urls").doc(shortCode).set({ originalUrl });
};

const getUrl = async (shortCode) => {
  const doc = await db.collection("urls").doc(shortCode).get();
  return doc.exists ? doc.data().originalUrl : null;
};

module.exports = {
  saveUrl,
  getUrl,
};
