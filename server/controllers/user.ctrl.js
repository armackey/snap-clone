var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var secret = config.secret.shh;

// finds users that are currently broadcasting
exports.getUsers = function (req, res) {
  User.find({}, '-password', function (err, users) {
    if (err)
      return err;
    var broadcasters = users.filter(function (user) {
      return user.broadcast === true;
    });
    res.send(broadcasters);
  });
};  

// for current user -- may not use...
exports.me = function (req, res) {
  User.findOne('-password', function (err, user) {
    console.log(req.decoded);
    res.send(req.decoded);
  });

};

exports.oneUser = function (req, res) {
  User.findById(req.params.id, '-password', function (err, user) {
    if (err)
      throw err;
    console.log(user);
    res.send(user);
  });
};

exports.broadcast = function (req, res)  {
  User.findOne(req.body.username, '-password', function (err, user) {
    console.log(user);
    user.room = req.body.room;
    user.broadcast = true;
    user.save(function (err) {
      if (err) {
        throw err;
      } 
      res.send(user);
    }); 
  });
};



exports.stopBroadcast = function (req, res) {
  User.findOne(req.body.username, function (err, user) {
    console.log(req.body);
    console.log(user);
    user.broadcast = false;
    user.save(function (err) {
      if (err) {
        throw err;
      }
      res.send(user);
    });
  });
};

// more passport authentication.
// doesn't work
exports.isLoggedIn = function (req, res) {
  if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
};

exports.signup = function (req, res, next) {
  passport.use(new LocalStrategy(
    function(username, password, done) {

      // find a user in mongo with provided username
      User.findOne({username: username}, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err){
          return done(err);
        }
        // already exists
        if (user) {
          res.send({message: 'Username taken!'});
          // return done(null, false, {message: 'Username taken!'});
        } else {
          // if there is no user, create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.username = username;
          newUser.password = bcrypt.hashSync(password);

          // save the user
          newUser.save(function(err) {
            if (err){
              throw err;  
            }
            console.log(newUser);
            return done(null, newUser);
          });
        }
      });
    })
  );

passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password'
},
  
  function(err, user, info) {
    if (err) { 
      return next(err);
    }
    if (!user) {
      return res.send({message:  'Check username or password :('});
    }
    
    // when user is created. token is created 
    // server sends token to client
   var token = jwt.sign({username: user.username}, secret);
   res.json({success: true, message: 'Enjoy!', token : token });
  })(req, res, next);

};

exports.login = function (req, res, next) {
  passport.use(new LocalStrategy(
     function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, ({message: 'wrong password'}));
        }
        console.log(user);
        return done(null, user);
      });
    }
  ));

passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Invalid username or password'
},
  function(err, user, info) {
    if (err) { 
      return next(err);
    }
    if (!user) {
      return res.send({message:  'Check username or password :('});
    }

    // credentials were accurate
    // jwt is created and sent to client
    var token = jwt.sign({username: user.username}, secret);
    res.json({success: true, message: 'Enjoy!', token : token });
    
  })(req, res, next);

};

exports.logout = function (req, res) {
  req.logout();
  console.log('see-ya!');
  res.redirect('/');
};



