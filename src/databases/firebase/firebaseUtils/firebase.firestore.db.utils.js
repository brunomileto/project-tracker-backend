const {db} = require('../firebase.firestore.database.js');
const User = require('../../../models/user.models.js');
const {firebaseWhere, collections} = require('../../../enumerators/enums.js');

async function checkEmailExists(emailAdress) {
  try {
    const snapshot = await getWhere(collections.users, 'email', 
                                    firebaseWhere.equal, emailAdress);

    if (snapshot.success) {
      return snapshot.snapshot.docs[0].exists;
    }
    return snapshot;
  } catch (error) {
    throw error;
  }
};

async function getWhere(collect, prop1, test, prop2){
  try {
    const snapshot = await db.collection(collect).where(prop1, test, prop2).get();
    
    if(snapshot.empty){
      return {success: false, message: 'This query return nothing!'};
    }
    return {success: true, snapshot};
  } catch (error) {
    throw error;
  }
};

async function getDoc(collect, docId){
  try {
    const snapshot = await db.collection(collect).doc(docId).get();
    snapshot.success = snapshot.exists;
    if(snapshot.exists)
      return {success:true, snapshot};
    snapshot.message = "This query return nothin";
    return {snapshot};

  } catch (error) {
    throw error;
  }
};

async function updateDoc(collect, docId, data){
  try {
    return createDoc(collect, docId, data);
  } catch (error) {
    throw error;
  }
};

async function createDoc(collect, docId, data){
  try {
    await db.collection(collect).doc(docId).set(data);
    return {success: true};
  } catch (error) {
    throw error;
  }
};

async function getUser(uid){
  try {
    const userSnapshot = await getDoc(collections.users, uid);
    
    if (!userSnapshot.success)
      throw new Error('Could not get the user!')
    
    return new User(userSnapshot.snapshot.data());

  } catch (error) {
    throw error
  }
}

module.exports = {
  checkEmailExists,
  getWhere,
  getDoc,
  updateDoc,
  createDoc,
  getUser,
};