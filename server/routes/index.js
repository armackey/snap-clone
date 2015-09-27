var userCtrl = require('../controllers/user.ctrl');
var User = require('../models/user.model');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var secret = config.secret.shh;
// import our app object
var app = module.parent.exports.app;


// allowed routes without authentication
app.post('/login', userCtrl.login);
app.post('/signup', userCtrl.signup);
app.post('/roomnumber', userCtrl.roomNumber);

// middleware that checks for jwt
// app.use(function(req, res, next) {

//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log(token);
//     // decode token
//     if (token) {

//       // verifies secret and checks exp
//       jwt.verify(token, secret, function(err, decoded) {

//         if (err) {
//           return res.json({ success: false, message: 'Failed to authenticate token.' });    
//         } else {
//           // if everything is good, save to request for use in other routes
//           req.decoded = decoded;    
//           next();
//         }
//       });

//     } else {

//       // if there is no token
//       // return an error
//       return res.status(403).send({ 
//           success: false, 
//           message: 'No token provided.' 
//       });
      
//     }
//   });

app.get('/logout', userCtrl.logout);
app.get('/users', userCtrl.getUsers);
app.get('/users/:user_id', userCtrl.oneUser);
app.get('/me', userCtrl.me);

