
const passport = require('passport');

var Loginer = function(dbManager) {
  this.dbManager =dbManager;
}

Loginer.prototype.login = function(data) {
  var status = checkData(data);
  return status;
}


var checkData = function(data) {
  if (!data.username || typeof data.username !== 'string' || data.username.trim().length === 0) {
    return {
      success: false,
      message: {username: "please provide your name",
                password: ''}
    }
  }
  
  if (!data.password || typeof data.password !== 'string' || data.password.trim().length === 0) {
    return{
      success: false,
      message: {username: '',
                password: "please enter your password"}
    }
  }
  return {
    success: true,
    message: "success in first step"
  }
}

module.exports = Loginer;