var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/snapdb2', function(err){
  if (err) { 
    return err;
  }
  console.log('connected to DB');
});

app.use('/',express.static('client'));
app.use(bodyParser.json());

//broadcasting Id post when button is clicked in /About
var id;
app.post('/broadcastID', function (req, res) {
   id = req.body.id;
  console.log(id);
});

//for specific user that will be sent to url
app.get('/user/:id', function (req, res) {
  User.findOne({_id: id}, (function (err, user) {
     if (err) {
      return next(err);
    }
    
  }));
   
});


app.listen(3000);

module.exports.app = app;
var userRoutes = require('../routes/index');