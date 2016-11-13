const bcrypt = require('bcrypt');
var userColl = "userdb";


module.exports = {
  checkUserName: function(db, user, res) {
    db.collection(userColl).find({"username": user.name}).limit(1).toArray(function(err, results) {
      if (err) {
        throw err;
      }
      else {
        if (results.length > 0) {
          res.send({
            success: false,
            errors: { name: 'Please user another username' }
          });
        }
        else {
          bcrypt.genSalt((saltError, salt) => {
              if (saltError) { console.log('saltError:', saltError); }
              bcrypt.hash(user.password, salt, (hashError, hash) => {
                if (hashError) { console.log('hashError:', hashError); }
                db.collection(userColl).insert({"username": user.name, "password": hash});
              });
          });
          res.send({
            success: true,
            errors: {}
          });
        }
      }
    });
  },
};
