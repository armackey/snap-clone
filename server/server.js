var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.model');
mongoose.connect('mongodb://localhost/snapdb2', function(err){
  if (err) { 
    return err;
  }
  console.log('connected to DB');
});


app.use('/',express.static('client'));
app.use(bodyParser.json());
app.use(passport.initialize());

//broadcasting Id post when button is clicked in /About
var id;
app.post('/broadcastID', function (req, res) {
   id = req.body.id;
  console.log(id);
});

app.listen(3000);

module.exports.app = app;
require('./routes/index');
require('./routes/comment');
// require('./config/pass.routes');

