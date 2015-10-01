var userCtrl = require('../controllers/user.ctrl');
var commentCtrl = require('../controllers/comment.ctrl');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var secret = config.secret.shh;
var passportMiddleware = passport.authenticate({session:false});
// import our app object
var app = module.parent.exports.app;

// allowed routes without authentication
app.post('/login', userCtrl.login);
app.post('/signup', userCtrl.signup);
app.put('/broadcasting', userCtrl.broadcast);
app.put('/stopbroadcast', userCtrl.stopBroadcast);
app.get('/users', userCtrl.getUsers);
app.get('/comments', commentCtrl.getComments);
app.post('/comments', commentCtrl.postComments);
app.get('/users/:id', userCtrl.oneUser);
// middleware that checks for jwt
app.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // token has been decoded 
          req.decoded = decoded;    
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    }
  });

app.get('/logout', userCtrl.logout);
app.get('/me', userCtrl.me);

