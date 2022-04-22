const User = require('../../../models/user.models.js');
const {v4} = require('uuidv4');
const EnumTest = require('../../enumerators/enumerators.js');

class Users {
  id = [];
  name = [];
  email = [];
  password = [];
  dateCreated = [];
  dateUpdated = [];

  constructor(){
    this.userTest01 = new User();
    this.userTest02 = new User();
  }

  setUsers(){

  }

  setValues(){
    this.id.push(v4());
    for(prop in EnumTest){
      if(typeof(prop) != 'object' && typeof(prop) != 'undefined'){
        this.setId(prop);
        this.setName(prop);
      };
    };
  };

  setId(prop){
    this.id.push(EnumTest[prop])
  };

  setName(prop){
    this.name.push(EnumTest[prop]);
  };

  setEmail(emailsProp){
    for(prop in emailsProp){
      this.email.push(EnumTest[emailsProp][prop])
    }
  };
}