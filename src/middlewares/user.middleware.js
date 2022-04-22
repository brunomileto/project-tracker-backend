const utils = require('../utilities/utils.js');
const dbUtils = require('../databases/firebase/firebaseUtils/firebase.firestore.db.utils.js')
const {db} = require('../databases/firebase/firebase.firestore.database.js');

function checkEmptyValues(request, response, next){
  try {
    const data = request.body;
    const dataProps = Object.keys(data);
    //util.isString('test');
    utils.isInteger(1);
    dataProps.forEach(prop => {
      var isString = utils.isString(data[prop]);
      if(!isString){
        return response.status(400).json({message: `${data[prop]} is not a valid string!`})
      }
    });
    
    next()

  } catch (error) {
    response.status(400).json({message: error.message});
  }
}

function checkPasswordRules(request, response, next){
  try {
    const {password} = request.body;

    if (!utils.stringHasNumber(password) || 
        !utils.stringHasCapitalLetters(password) || 
        (password.length < 8)){
          response.status(400).json({message: "Password must be a combination of letters" +
          " and numbers. Also, should have capital letters and be greater" +
          " than 8 characters!"});
        }
    next();
  } catch (error) {
    response.status(400).json({message: error.messsage});
  }
}

function checkPasswords(request, response, next){
  try {
    const {password, passwordCheck} = request.body;

    if (password !== passwordCheck){
      response.status(400).json({message:"Passwords should be the same!"});
    }
    next();
  } catch (error) {
    response.status(400).json({message: error.messsage});
  }
}

async function validateEmail(request, response, next) {
  try {
    const {email} = request.body;
    const validEmail = utils.emailValidation(email);
    if(!validEmail){
      return response.status(400).json({message: "Please, inform a valid email address!"});
    }
    next()
  } catch (error) {
    response.status(400).json({message: error.messsage})
  }
}

async function checkEmailExists(request, response, next){
  try {
      const {email} = request.body;
      const snapshot = await dbUtils.checkEmailExists(email);
      if (snapshot.success){
        next();
      }
      return response.status(400).json(snapshot);
    } catch (error) {
    response.status(400).json({message: error.messsage})
  }
}

async function checkUserExists(request, response, next){
  try {
    const email = request.params.email;
    dbUtils.checkEmailExists(email).then(value => {
      if (value) {
        next()
      } else {
          return response.status(400).json({message:"This user/email does not exist!"})
      }
    })
  } catch (error) {
    response.status(400).json({message: error.messsage})
  }
}

module.exports = {
  validateEmail,
  checkEmailExists,
  checkPasswordRules,
  checkPasswords,
  checkEmptyValues,
  checkUserExists,
};