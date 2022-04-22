const {UserAuth} = require('./user.auth.models.js');
class User extends UserAuth {
  constructor(data){
    super(data);
    if(typeof(data) !== 'undefined'){
      this.dateCreated = data.dateCreated;
      this.dateUpdated = data.dateUpdated;
    } else {
      this.dateCreated = data;
      this.dateUpdated = data;
    }
  }
}

module.exports = {
  User,
  UserAuth,
};