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

//array holding messages since no connected to db
var UserModel = [
  {
    username: 'iam_samara',
    date: Date.now(),
    comment:"today you are you, that is truer than true, there is no one alive that is youer that you!"
  },
  {
    username: 'armackey',
    date: Date.now(),
    comment:"The mack attack"
  },
  {
    username: 'jasmine',
    date: Date.now(),
    comment:"janky"
  }];



var User = mongoose.model('User', UserSchema);


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
          } // -> Password123: true
          else{
            console.log('you dont exist');
            next();
          }
      });
  })
});


//get request for all comments.
app.get('/comments', function(req,res){
  res.send(UserModel);
});

//pushes new message to the userModel array
app.post('/comments', function(req,res){
  UserModel.push(req.body);
  console.log("message saved");
  res.send(req.body);
});

app.listen(3000);
