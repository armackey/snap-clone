var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.model');
var flash = require('connect-flash');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/snapdb2', function(err){
  if (err) { 
    return err;
  }
  console.log('connected to DB');
});


app.use('/',express.static('client'));
app.use(bodyParser.json());
app.use(methodOverride());
// app.use(flash());
app.use(passport.initialize());
// app.use(passport.session());



app.listen(3000);
// export app so that the app object is available for use in other files
module.exports.app = app;
// required routes that our app uses
// our routes must be below the exported app object or they WON'T BE FOUND
require('./routes/user');
require('./routes/comment');


