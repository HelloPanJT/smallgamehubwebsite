var urlChecker = require('valid-url');
var request = require('request');
var GameCollManager =  function(db) {
  this.db = db;
}

GameCollManager.prototype.addGame = function(collectName, data, res) {
  var status = urlChecker.isUri(data.content.url);
  var self = this;
  if (status) {
    this.db.collection(collectName).find({'content.url': data.content.url}).limit(1).toArray(function(err, results) {
      if (err) {
        throw err;
      } 
      else {
        if (results.length > 0) {
          res.send({
            success: false,
            message: 'this url has been shared!!!'
          })
        } else {
          self.db.collection(collectName).insert(data);
          res.send({
            success: true,
            message: 'your game has been post successfully'
          })
        }
      }
    });
  } 
  else {
    console.log("is invalid url");
    res.send({
      success: false,
      message: "invalid uri, forget to add 'http://' ?"
    });
  }
}

GameCollManager.prototype.showUserColl = function(collectName, userName, res) {
  this.db.collection(collectName).find({username: userName}).toArray(function(err, results){
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
}

GameCollManager.prototype.getAllTags = function(collectName, res) {
  this.db.collection(collectName).find().toArray(function(err, results) {
    if (err) {
      res.send('fail');
      throw err;
    } else {
      res.send(results);
    }
  })
}

GameCollManager.prototype.update = function(collectName, data, res) {
  var newTag = Object.keys(data.tags);
  this.db.collection(collectName).update({'content.url': data.url}, {$set:{'content.gameName':data.gameName
                                          , 'tags': newTag}});
  res.send("success");
}

GameCollManager.prototype.like = function(collectName, targetName, data, res) {
  var self = this;

  this.db.collection(collectName).find({username: data.username, url: data.url})
    .toArray(function(err, results) {
      if (err) {
        res.send({
          success: false,
        });
        throw err;
      } else if (results.length == 0) {
        self.db.collection(collectName).insert(data);
        self.db.collection(targetName).update({'content.url': data.url}, {$inc: {likeCount: 1}});
        res.send({
          success: true,
          likeCount: data.likeCount + 1
        });
      } else {
        res.send({
          success: false
        });
      }
    })
}

GameCollManager.prototype.delete = function(collectName, targetName, data, res) {
  this.db.collection(collectName).remove({'content.url': data.url});
  this.db.collection(targetName).remove({url: data.url});
  res.send({
    success: true
  });
}

GameCollManager.prototype.getTopGames = function(collectName, res) {
  this.db.collection(collectName).find().sort({likeCount: -1}).limit(10).toArray(function
    (err, results) {
      if (err) {
        res.send({
          success: false
        });
        throw err;
      } else {
        res.send(results);
      }
    })
}

GameCollManager.prototype.search = function(collectName, data, res) {
  this.db.collection(collectName).find({'tags': data.tag}).toArray(
    function(err, results) {
    if (err) {
      res.send({
        success: false
      })
      throw err;
    } else {
      res.send(results);
    }
  })
}
module.exports = GameCollManager;