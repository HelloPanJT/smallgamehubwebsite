const bcrypt = require('bcrypt');
var collectName = require('./CollectName');
var usrNameRM = require('./recommendUsrName').recommendName;

var UserNameChecker = function(db) {
  this.db = db;
}

UserNameChecker.prototype.checkUser = function(user, res) {
  var self = this;
  this.db.collection(collectName.USERCOLL).find({"username": user.username}).limit(1).toArray(function(err, results) {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        self.db.collection(collectName.USERCOLL).find({username: {$regex: user.username}}).toArray(function(suberr, subresults){
          if(suberr){
            throw err;
          } else {
            var recName = usrNameRM(subresults, user.username);
            res.send({
              success: false,
              message: {username: 'username has been used ' + 'recommendName:' + '\n' +recName,
                        password:''}
            });
          }
        })
      } else {
        bcrypt.genSalt((saltError, salt) => {
          if (saltError) { console.log('saltError:', saltError); }
          bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) { console.log('hashError:', hashError); }
            self.db.collection(collectName.USERCOLL).insert({"username": user.username, "password": hash});
          });
        });
        res.send({
          success: true,
          message: {username: 'signup sucessfully',
                    password: ''}
        });
      }
    }
  });
}

module.exports = UserNameChecker;
