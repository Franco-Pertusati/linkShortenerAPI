const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.resolve(__dirname, "/etc/secrets/linktun-558d6-firebase-adminsdk-aym5j-26cbeaa820");

admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore();
module.exports = db;
