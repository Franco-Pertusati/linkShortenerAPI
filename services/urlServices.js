const db = require('../config/firebase');

const saveUrl = async (shortCode, originalUrl, userId) => {
  try {
    await db
      .collection('urls')
      .doc(shortCode)
      .set({
        originalUrl,
        userId: userId || null,
        createdAt: new Date().toISOString(),
        clicks: 0,
      });
  } catch (error) {
    console.error('Error saving URL to Firestore:', error);
    throw new Error('Failed to save URL');
  }
};

const getUrl = async (shortCode) => {
  try {
    const docRef = db.collection('urls').doc(shortCode);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    await docRef.update({
      clicks: (doc.data().clicks || 0) + 1,
    });

    return doc.data().originalUrl;
  } catch (error) {
    console.error('Error getting URL from Firestore:', error);
    throw new Error('Failed to get URL');
  }
};

const getUrlsByUserId = async (userId) => {
  try {
    const urlsRef = db.collection('urls');
    const querySnapshot = await urlsRef.where('userId', '==', userId).get();

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching URLs by userId:', error);
    throw new Error('Failed to fetch URLs for user');
  }
};

module.exports = {
  saveUrl,
  getUrl,
  getUrlsByUserId,
};
