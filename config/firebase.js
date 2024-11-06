const admin = require('firebase-admin');
const serviceAccount = require('../linktun-558d6-firebase-adminsdk-aym5j-26cbeaa820.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
