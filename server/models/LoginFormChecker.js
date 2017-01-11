
var LoginFormChecker = function() {

}

LoginFormChecker.prototype.validateLoginForm(loginData) {
  const errors = {};
  var isFormValid = true;

  if (!loginData || typeof loginData.name !== 'string' || loginData.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your username.';
  }

  if (!loginData || typeof loginData.password !== 'string' || loginData.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  return {
    success: isFormValid,
    message: errors
  };
}

module.exports = LoginFormChecker;