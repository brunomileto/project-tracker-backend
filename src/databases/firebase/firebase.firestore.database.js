// [START firestore_deps]
//const { initializeApp, cert } = require('firebase-admin/app');
//const { getFirestore } = require('firebase-admin/firestore');
const firebaseAdmin = require('firebase-admin');
// [END firestore_deps]
const serviceAccount = require('../../../project-tracker-bmda-firebase-adminsdk-7b3ud-4563e8521d.json')

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

//const firestore = new firebaseAdmin.firestore.Firestore();

const db = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();
//db.settings({ignoreUndefinedProperties: true});
module.exports = {
  db,
  auth,
};
