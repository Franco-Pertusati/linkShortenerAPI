const db = require("../config/firebase");

const saveUrl = async (shortCode, originalUrl, userId) => {
  try {
    await db.collection("urls").doc(shortCode).set({
      originalUrl,
      userId: userId || null,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving URL to Firestore:', error);
    throw new Error('Failed to save URL');
  }
};

const getUrl = async (shortCode) => {
  const doc = await db.collection("urls").doc(shortCode).get();
  return doc.exists ? doc.data().originalUrl : null;
};

module.exports = {
  saveUrl,
  getUrl,
};
