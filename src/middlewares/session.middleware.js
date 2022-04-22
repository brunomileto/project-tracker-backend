const {verify} = require('jsonwebtoken');
const authConfig = require('../configuration/auth.js')

function ensureAuthenticated(request, response, next){
  try {
    // validação token jwt
    const authHeader = request.headers.authorization;
    if(authHeader){
      const [type, token] = authHeader.split(' ');
      try { 
        const {uid, email} = verify(token, authConfig.jwt.secret);   
        request.user = {
          uid,
          email
        }    
        return next(); 
      } catch (error) {
        next(error)
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {ensureAuthenticated};