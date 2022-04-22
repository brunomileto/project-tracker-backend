const {db, auth} = require('../databases/firebase/firebase.firestore.database.js');
const { User, UserAuth } = require('../models/user.models.js');
const {v4} = require('uuid');
const Utils = require('../utilities/utils.js');
const FirebaseAuthUtils = require('../databases/firebase/firebaseUtils/firebase.firestore.auth.utils.js');
const FirebaseDBUtils = require('../databases/firebase/firebaseUtils/firebase.firestore.db.utils.js');
const {collections} = require('../enumerators/enums.js')
const {hash} = require('bcryptjs');
const {getResponseObj} = require('./basic.controller');


async function getUser(request, response, next){
  try {
    
    const email = request.query.email;

    // getting the user uid
    const userAuth = await FirebaseAuthUtils.getAUserByEmail(email);

    // getting the user db
    const userDbSnapshot = await FirebaseDBUtils.getDoc(collections.users, userAuth.uid);
    var user = new User(userDbSnapshot.snapshot.data())
    delete user.password
    
    var responseObj = getResponseObj(userDbSnapshot.snapshot.success, user)
    return response.status(responseObj.status).json(responseObj);
    
  } catch (error) {
    next(error);
  }
};

async function updateUser(request, response, next){
  try {

    const data = request.body;
    const userAuth = new User(data);
    userAuth.uid = request.params.uid;
    const userAuthUpdated =  await FirebaseAuthUtils.updateUser(userAuth);
    const user = new User(Utils.objectToJson({...userAuthUpdated, ...data}));
    user.uid = hash(user.uid, 10);
    user.providerData.uid = hash(user.uid, 10);
    const userDbSnapshot = await FirebaseDBUtils.updateDoc(collections.users, user.uid, Utils.objectToJson(user));

    if (userDbSnapshot.success) 
      delete user.uid;

    var responseObj = getResponseObj(userDbSnapshot.success, user)
    return response.status(responseObj.status).json(responseObj);
  } catch (error) {
    next(error);
  }
};

async function createUser(request, response, next){
  try {
    const data = request.body;
    data.uid = v4();
    const userAuth = new UserAuth(data);

    const createdUserAuth = await FirebaseAuthUtils.createAUser(userAuth);
    const user = new User(Utils.objectToJson({...createdUserAuth, ...data}));    
    user.password = await Utils.encrypt(user.password);
    const userDbSnapshot = await FirebaseDBUtils.createDoc(collections.users, user.uid, Utils.objectToJson(user));

    if(userDbSnapshot.success)
      delete user.password;

    var responseObj = getResponseObj(userDbSnapshot.success, user)
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  createUser,
}