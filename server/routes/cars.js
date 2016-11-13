var express = require('express');
var router = express.Router();
const passport = require('passport');

var userModel = require('../models/user');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://ds057176.mlab.com:57176/today';
var dbUser = "panjintian";
var dbPassword = "panjintian";
var userColl = "userdb";

MongoClient.connect(mongoURI,function(err,db){
  if (err)
    console.log('connect error');
  else {
    db.authenticate(dbUser, dbPassword, function(err,result){
      if(err)
        throw err;
      else {
        router.post('/signup', function(req,res){
          var validateData = validateSignupForm(req.body);
          if (!validateData.success) {
            res.send(validateData);
          }
          else {
            userModel.checkUserName(db, req.body, res);
          }
        });

        router.post('/login', function(req,res){
          var validateData = validateLoginForm(req.body);
          if (!validateData.success) {
            res.send(validateData);
          }
          else {
            passport.authenticate('login', (err, token, userData) => {
              if (err) {
                res.send({
                  success: false,
                  message: 'Incorrect username or password'
                });
              } else {
                res.send({
                  success: true,
                  message: 'You have successfully logged in!',
                  token,
                  user: userData
                });
              }
            })(req, res);
          }
        });
      }
    });
  }
})

function validateLoginForm(signUpData) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!signUpData || typeof signUpData.name !== 'string' || signUpData.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your username.';
  }

  if (!signUpData || typeof signUpData.password !== 'string' || signUpData.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  return {
    success: isFormValid,
    errors
  };
}

function validateSignupForm(signUpData) {
  const errors = {};
  var isFormValid = true;
  var message = '';

  if (!signUpData || typeof signUpData.password !== 'string' || signUpData.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!signUpData || typeof signUpData.name !== 'string' || signUpData.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your username.';
  }

  return {
    success: isFormValid,
    errors
  };
}

module.exports = router;
