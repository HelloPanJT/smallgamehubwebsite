var express = require('express');
var router = express.Router();
var request = require('request');
var SignUpChecker = require('../models/SignUpFormChecker');
var Loginer = require('../models/Loginer');
var loginInst = new Loginer();
var collName = require('../models/CollectName');
var pageParams = require('../models/pageParams');
const passport = require('passport');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = 'mongodb://ds057176.mlab.com:57176/today';
var dbUser = "panjintian";
var dbPassword = "panjintian";
var GameCollManager = require('../models/GameCollManager');
MongoClient.connect(mongoURI,function(err,db){
  if (err) {
    console.log('connect error');
  } else {
    db.authenticate(dbUser, dbPassword, function(err,result){
      if (err) {
        console.log("validation error!");
        throw err;
      } else {
        var signUpCheckerInst = new SignUpChecker(db);
        var gameCollManagerInst = new GameCollManager(db);
        router.post('/signup', function(req, res) {
          signUpCheckerInst.validateSignupForm(req.body, res);
        });

        router.post('/login', function(req, res) {
          var status = loginInst.login(req.body);
          if (status.success) {
            passport.authenticate('login', (err, token, userData) => {
              if (err) {
                var errors = {};
                errors.username = 'Incorrect username or password';
                errors.password = 'Incorrect username or password';
                status = {
                  success: false,
                  message: errors
                }
              } else {
                status = {
                  success: true,
                  message: {username: 'You have successfully logged in!',
                            password: ''},
                  token: token,
                  user: userData
                };
              }
              res.send(status);
            })(req, res);
          } else {
            res.send(status);
          }
        });

        router.post('/edit', function(req,res){
          gameCollManagerInst.update(collName.GAMECOLL, req.body, res);
        })

        router.post('/addGame', function(req, res) {
          gameCollManagerInst.addGame(collName.GAMECOLL, req.body, res);
        });
        // the following request will return all developed games of one user
        router.post('/showList', function(req, res) {
          gameCollManagerInst.showUserColl(collName.GAMECOLL, req.body.username, res);
        })
    
        router.post('/getAllTags', function(req, res) {
          gameCollManagerInst.getAllTags(collName.TAGCOLL, res);
        })

        router.post('/like', function(req, res) {
          gameCollManagerInst.like(collName.USERFAV, collName.GAMECOLL, 
            req.body, res);
        })

        router.post('/search', function(req, res) {
          gameCollManagerInst.search(collName.GAMECOLL, req.body, res);
        })

        router.post('/delete', function(req, res) {
          gameCollManagerInst.delete(collName.GAMECOLL, collName.USERFAV, req.body, res);
        })

        router.post('/getTopGames', function(req, res) {
          gameCollManagerInst.getTopGames(collName.GAMECOLL, res);
        });
      }
    })
  }
})


module.exports = router;
