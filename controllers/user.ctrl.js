var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var Comments = require('../models/comments.model');

module.exports.getUsers = function (req, res) {
  User.find({}, function (err, users) {
    if (err)
      return err;
    res.send(users);
  });
};  

module.exports.signIn = function (req, res) {
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save(function(){
    console.log('newUser created');
  });
};

module.exports.login = function (req, res) {
  User.findOne({'username': req.body.username}, function(err,user){
      user.comparePassword(req.body.password, function(err, isMatch) {
          if (err) throw err;
          if(isMatch){
            console.log('youre getting a token!');
            var access_token = hat();
            User.findOneAndUpdate({'username': req.body.username},{'access_token': access_token}, function(err, person){
              console.log("sending updated person   " + person);
              res.send(person);
            });
          }
          else{
            console.log('you dont exist');
            next();
          }
      });
  });
};

module.exports.getComments = function (req, res) {
  Comments.find({},function(err, data){
    if(err) throw err;
    res.send(data);
  });
};

module.exports.postComments = function (req, res) {
  var newComment = new Comments({
    date: req.body.date,
    username: req.body.username,
    comment: req.body.comment
  });
  newComment.save(function(){
    console.log('comment saved in db');
    res.send(newComment);
  });
};












