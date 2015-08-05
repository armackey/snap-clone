var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
var hat = require('hat');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);




//var url = 'mongodb://localhost27017/usersDB';
mongoose.connect('mongodb://localhost/snapdb',function(err){
  if(err){return err;}
  console.log('connected to DB');
});

app.use('/',express.static('client'));
app.use(bodyParser.json());

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true},
  access_token:{type: String}
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var CommentSchema = new Schema({
  date: { type: Date, default: Date.now },
  username: { type: String, index: { unique: true } },
  comment:{type: String}
});

var User = mongoose.model('User', UserSchema);
var Comments = mongoose.model('Comments',CommentSchema);


//sign in request, creates new user in db
app.post('/users', function(req, res, next) {
  // save new user to database
  var hash = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hash;
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser.save(function(){
    console.log('newUser created');
  });

});

//login request, finds if user exist
app.post('/login', function(req,res,next){
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
  })
});


//get request for all comments.
app.get('/comments', function(req,res){
//  res.send();
  Comments.find({},function(err, data){
    if(err) throw err;
    res.send(data);
  })
});

//pushes new message to the userModel array
app.post('/comments', function(req,res){
  // UserModel.push(req.body);
  // console.log("message saved");
  // res.send(req.body);
  console.log(req.body);
  var newComment = new Comments({
    date: req.body.date,
    username: req.body.username,
    comment: req.body.comment
  });
  newComment.save(function(){
    console.log('comment saved in db');
    res.send(newComment);
  });

});

app.listen(3000);
