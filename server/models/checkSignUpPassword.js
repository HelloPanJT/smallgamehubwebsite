var specialString = require('./passwordCheckCode').specialString;
var pswCheckcode = require('./passwordCheckCode').pswCheckcode;


function isSpecialCharacter(c){
  for (var index = 0; index < specialString.length; index++) {
    if (specialString.charAt(index) == c){
	  return true;
	}
  }
  return false;
}

function checkValid(password){
  var special =1, upLetter = 1, number = 1, index = 0;
  while (index < password.length && (special == 1 || number == 1 || upLetter == 1)) {
	var c = password.charAt(index);
	if (c >= '0' && c <= '9') {
	  number--;
	} else if (isSpecialCharacter(c)) {
	  special--;
	} else if (c >= 'A' && c <= 'Z') {
	  upLetter--;
	}
	  index++;
  }

  if (password.length < 8) {
	return pswCheckcode.SHORT_ERR;
  } else if (number > 0) {
	return pswCheckcode.NUMBER_ERR;
  } else if (upLetter > 0) {
	return pswCheckcode.LETTER_ERR;
  } else if (special > 0) {
	return pswCheckcode.SPECIAL_ERR;
  } else{
	return pswCheckcode.SUCCESS;
  }
}


var checkPassWord = function(password) {
  var errors = {};
  var isFormValid = true;
  errors.username = '';
  if (typeof password !== 'string') {
    isFormValid = false;
    errors.password = 'password should not be a null string';
  }
  else{
    var code = checkValid(password);
    isFormValid = false;
    if (code == pswCheckcode.SUCCESS) {
      isFormValid = true;
    } else if (code == pswCheckcode.SHORT_ERR) {
      errors.password = 'password length should not less than 8';
    } else if (code == pswCheckcode.NUMBER_ERR) {
      errors.password = 'password should contain one digit at least';
    } else if(code == pswCheckcode.SPECIAL_ERR){
      errors.password = 'password should contain one of the following special character at least: ' + specialString;
    } else {
      errors.password = 'password should contain one UpperCase Letter at least';
    }
  }
  return {
    success: isFormValid,
    message: errors
  };
}

module.exports.checkPassWord = checkPassWord;