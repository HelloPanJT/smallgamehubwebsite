
const passport = require('passport');

var Loginer = function(dbManager) {
  this.dbManager =dbManager;
}

Loginer.prototype.login = function(data) {
  var status = checkUserName(data.username);
  return status;
}


var checkUserName = function(userName) {
  if (!userName || typeof userName !== 'string' || userName.trim().length === 0) {
    return {
      success: false,
      message: "please provide your name"
    }
  }

  return {
    success: true,
    message: "success in first step"
  }
}

module.exports = Loginer;