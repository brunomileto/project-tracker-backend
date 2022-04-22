class UserAuth {
  constructor(data){
    if(typeof(data) !== 'undefined'){
      this.uid = data.uid;
      this.displayName = data.name;
      this.email = data.email;
      this.emailVerified = data.emailVerified;
      this.disabled = data.disabled;
      this.password = data.password;
      this.metadata = data.metadata;
      this.tokensValidAfterTime = data.tokensValidAfterTime;
      this.providerData = data.providerData;
    } else {
      this.uid = data;
      this.displayName = data;
      this.email = data;
      this.emailVerified = data;
      this.disabled = data;
      this.password = data;
      this.metadata = data;
      this.tokensValidAfterTime = data;
      this.providerData = data;
    }
  }
}

module.exports = {
  UserAuth
};