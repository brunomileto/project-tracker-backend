const {db, auth} = require('../databases/firebase/firebase.firestore.database.js');
const authConfig = require('../configuration/auth.js');
const {sign} = require('jsonwebtoken');
const { User, UserAuth } = require('../models/user.models.js');
const {v4} = require('uuid');
const Utils = require('../utilities/utils.js');
const FirebaseAuthUtils = require('../databases/firebase/firebaseUtils/firebase.firestore.auth.utils.js');
const FirebaseDBUtils = require('../databases/firebase/firebaseUtils/firebase.firestore.db.utils.js');
const {collections} = require('../enumerators/enums.js')
const {hash} = require('bcryptjs');
const {getResponseObj} = require('./basic.controller');

async function authenticate (request, response, next){
  try {
    const {email, password} = request.body;
    var custSuccess = false;
    const userAuth = await FirebaseAuthUtils.getAUserByEmail(email);
    const userDbSnapshot = await FirebaseDBUtils.getDoc(collections.users, userAuth.uid);
    var token = null;
    if(userAuth || userDbSnapshot.success){
      const user = new User(userDbSnapshot.snapshot.data());
      const passwordMatched = await Utils.compareEncrypted(password, user.password);
  
      if(passwordMatched){
        token = sign({uid: user.uid, email: user.email}, authConfig.jwt.secret, {
          subject: user.uid,
          expiresIn: authConfig.jwt.expiresIn,
        })
        delete user.password;
        custSuccess = true;
      }
    } 

    var responseObj = getResponseObj(custSuccess, {"token": token})
    if (!custSuccess)
      responseObj.message = 'Incorrect email/password combination.';
      
    return response.status(responseObj.status).json(responseObj);

  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticate,
}