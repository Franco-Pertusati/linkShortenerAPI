const admin = require("firebase-admin");
const serviceAccount = require("./<nombre-del-archivo>.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { db };
