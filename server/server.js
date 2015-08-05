var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/snapdb');

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true}
});


// var CommentSchema = new Schema({
//   comment: {type: String, required: true}
// });

app.use(express.static('client'));
app.use(bodyParser.json());
// before trying to connect to the database, saving messages to array. refresh when server restarts
// initiated dummy data so the page isn't blank.

var id;
app.post('/broadcastID', function (req, res) {
  var id = req.body.ID;
  console.log(id);
});

app.get('/user/:id', function (req, res) {
   req.params.id = id;
   console.log(id);
});

app.get('/users', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      return next(err);
    }
    res.json(users);

  });
});


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
