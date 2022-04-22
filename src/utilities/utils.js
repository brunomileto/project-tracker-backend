const bcrypt = require('bcryptjs');

function stringHasNumber(str){
  return /\d/.test(str);
};

function stringHasCapitalLetters(str){
  return (/[a-z]/.test(str) && /[A-Z]/.test(str));
};

function emailValidation (emailAdress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
};

function isString(value){
  return typeof(value) === 'string';
}

function isInteger(value){
  return typeof(value) === 'integer';
}

function stringIsEmpty(str){
  return str === ""
}

function dateTodayAAAAMMDD(){
  return getDateAAAAMMDD(new Date())
}

function dateToAAAAMMDD(date){
  return getDateAAAAMMDD(date);
}

function getDateAAAAMMDD(date){
  var day = date.getDate().toString();
  if(day.length == 1){
    day = 0 + day;
  }

  var month = (date.getMonth() + 1).toString();
  if (month.length == 1) {
    month = 0 + month;
  }
  
  const year = date.getFullYear().toString();

  const newDate = +(year + month + day); // Convert to integer
  return (year + month + day);
}

function getDate(dateInteger){
  var dateString = dateInteger.toString();
  const year = +(dateString.substring(0, 4));
  const month = +(dateString.substring(4, 6));
  const day = +(dateString.substring(6));
  return new Date(year, month-1, day);
}

function objectToJson(obj){
  return (JSON.parse(JSON.stringify(obj)));
}

function jsonToObject(jsonString){
  return (JSON.parse(jsonString));
}

function exists(value){
  return (typeof(value !== 'undefined') && (value != null));
}

async function encrypt(value){
  return await bcrypt.hash(value, 10);
};

async function compareEncrypted(value, encryptedValue){
  return await bcrypt.compare(value, encryptedValue)
}


module.exports = {
  stringHasNumber,
  stringHasCapitalLetters,
  emailValidation,
  isInteger,
  isString,
  getDate,
  getDateAAAAMMDD,
  dateToAAAAMMDD,
  dateTodayAAAAMMDD,
  jsonToObject,
  objectToJson,
  exists,
  encrypt,
  compareEncrypted,
};