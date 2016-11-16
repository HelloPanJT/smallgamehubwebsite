var express = require('express');
var router = express.Router();
const passport = require('passport');
var request = require('request');
var mongodb = require('mongodb');
var userModel = require('../models/user');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://ds057176.mlab.com:57176/today';
var dbUser = "panjintian";
var dbPassword = "panjintian";
var userColl = "userdb";
var courseColl = "courses";
var pswChecker = require('../models/checkSignUpPassword').checkValid;
var pswCheckcode = require('../models/passwordCheckCode').pswCheckcode;
var specialString = require('../models/passwordCheckCode').specialString;
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

        router.post('/addcourse', function(req,res){
          var slug = req.body.data.url.split('/');
          slug = slug[slug.length-1];
          request('https://api.coursera.org/api/courses.v1?fields=photoUrl&q=slug&slug='+slug, (error, response, body)=> {
            if (!error && response.statusCode === 200) {
              response = JSON.parse(body);
              var data = response.elements[0];
              data['username'] = req.body.username;
              data['url'] = req.body.data.url;
              data['description'] = req.body.data.description;
              db.collection(courseColl).insert(data);
            }
          })
          res.send('success');
        });

        router.post('/display', function(req,res){
          db.collection(courseColl).find({"username": req.body.username}).toArray(function(err, results) {
            if (err) {
              throw err;
            }
            else {
              res.send(results);
            }
          });
        });

        router.post('/editcourse', function(req,res){
          console.log(req.body);
          db.collection(courseColl).update(
            { "_id" : new mongodb.ObjectID(req.body.id) },
            { $set : { description : req.body.description }}
          );
          res.send('success');
        });

        router.post('/delete', function(req,res){
          db.collection(courseColl).remove({ "_id" : new mongodb.ObjectID(req.body.id) });
        });
      }
    });
  }
})

function validateLoginForm(signUpData) {
  const errors = {};
  var isFormValid = true;
  var message = '';

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

  if (!signUpData || typeof signUpData.password !== 'string') {
    isFormValid = false;
    errors.password = 'password should not be a null string';
  }
  else{
    var code = pswChecker(signUpData.password);
    isFormValid = false;
    if(code == pswCheckcode.SUCCESS){
      isFormValid = true;
    }else if(code == pswCheckcode.SHORT_ERR){
      errors.password = 'password length should not less than 8';
    }else if(code == pswCheckcode.NUMBER_ERR){
      errors.password = 'password should contain one digit at least';
    }else if(code == pswCheckcode.SPECIAL_ERR){
      errors.password = 'password should contain one of the following special character at least: ' + specialString;
    }else{
      errors.password = 'password should contain one UpperCase Letter at least';
    }
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
