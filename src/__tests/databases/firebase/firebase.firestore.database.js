// [START firestore_deps]
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// [END firestore_deps]
const serviceAccount = require("../../../../firebase-admin.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = {
  db,
};
