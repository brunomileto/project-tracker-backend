const {auth} = require('../firebase.firestore.database.js');
const Utils = require('../../../utilities/utils.js');
const FirebaseDBUtils = require('./firebase.firestore.db.utils.js');
const {collections, firebaseWhere} = require('../../../enumerators/enums.js');


async function createAUser(userAuth){
  try {

    const userDbSnapshot = await FirebaseDBUtils.getWhere(collections.users, 'email', firebaseWhere.equal, userAuth.email);

    if (userDbSnapshot.success)
      userAuth.uid = userDbSnapshot.docs[0].data().uid;

    const userRecord = await auth.createUser(Utils.objectToJson(userAuth));

    if(Utils.exists(userRecord.uid))
      return userRecord;

  } catch (error) {
    throw error
  }
};

async function getAUserByEmail(userEmail){
  try {

    const userRecord = await auth.getUserByEmail(userEmail);
    
    if(Utils.exists(userRecord.uid))
      return userRecord;

  } catch (error) {
    throw error;
  }
};

async function updateUser(userAuth){
  try {
    
    const userRecord = await auth.updateUser(userAuth.uid, userAuth);

    if(Utils.exists(userRecord.uid))
      return userRecord;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAUser,
  getAUserByEmail,
  updateUser,
};