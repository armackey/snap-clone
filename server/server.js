var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');
console.log("connected to server")


//var url = 'mongodb://localhost27017/usersDB';
mongoose.connect('mongodb://localhost/snapdb');

app.use('/',express.static('client'));
//before trying to connect to the database, saving messages to array. refresh when server restarts
//initiated dummy data so the page isn't blank.

var UserSchema = new Schema({
  login: { type: String},
  password:{ type: String, default: 'hahaha'},
});


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


var MyModel = mongoose.model('User', UserSchema);
app.use(bodyParser.json());

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
