var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
// var hat = require('hat');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var secret = 'Victoria_Secret';


exports.getUsers = function (req, res) {
  User.find({}, function (err, users) {
    if (err)
      return err;
    res.send(users);
  });
};  
exports.logout = function (req, res) {
  req.logout();
  console.log('see-ya!');
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

    //user has authenticated correctly thus we create a JWT token 
   var token = jwt.sign({username: user.username}, secret);
   res.json({success: true, message: 'Enjoy!', token : token });
  })(req, res, next);
  // User.findOne({
  //   username: req.body.username}, function(err, user) {
  //     if (err) 
  //       throw err;
  //     if (user) {
  //       res.send({message: 'Username taken'});
  //     } else {
  //       var hash = bcrypt.hashSync(req.body.password, salt);
  //       req.body.password = hash;
  //       var newUser = new User({
  //         username: req.body.username,
  //         password: req.body.password,
  //       });
  //       newUser.save(function(){
  //         console.log('newUser created');
  //         res.json(newUser);
  //       });
  //     }
  //   });

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

    //user has authenticated correctly thus we create a JWT token 
    var token = jwt.sign({username: user.username}, secret);
    res.json({success: true, message: 'Enjoy!', token : token });
    
  })(req, res, next);

  // User.findOne({
  //   username: req.body.username}, function(err, user){
  //     // user.comparePassword(req.body.password, function(err, user) {
  //         if (err) throw err;
  //         if (user) {
  //            // creating and passing jwt to user
  //          var token = jwt.sign({username: user.username}, secret);
  //            res.json({success: true, 
  //             message: 'Enjoy!', 
  //             token : token });

  //         } else {
  //           res.send({message: 'you shall not pass! signup!'});
  //           next();
  //         }
  //     // });
  // });
};

exports.me = function (req, res) {
  res.send(req.decoded);
};

exports.oneUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
      throw err;
    res.send(user);
  });
};

exports.isLoggedIn = function (req, res) {
  if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
};



