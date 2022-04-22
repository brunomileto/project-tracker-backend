// [START firestore_deps]
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
// [END firestore_deps]
const serviceAccount = require('../../..project-tracker-bmda-firebase-adminsdk-7b3ud-4563e8521d.json')


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
  db,
};
