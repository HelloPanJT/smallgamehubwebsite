var UserNameChecker = require('./UserNameChecker');
var checkPassWord = require('./checkSignUpPassword').checkPassWord;

var SignUpFormChecker = function(db) {
  this.userChecker = new UserNameChecker(db);
}

SignUpFormChecker.prototype.validateSignupForm = function(signUpData, res) {
  console.log(signUpData.password);
  var status = checkPassWord(signUpData.password);
  if (!status.success) {
    res.send(status);
  } else {
    this.checkUser(signUpData, res);
  }
}

SignUpFormChecker.prototype.checkUser = function(signUpData, res) {
  return this.userChecker.checkUser(signUpData, res);
}

module.exports = SignUpFormChecker;