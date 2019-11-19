'use strict';

// Passport configuration

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');

// Save userId to session
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

// Set req.user from session userId
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

// Set different strategies
// Use local passport authentication method
passport.use(
  'signup',
  new LocalStrategy((username, password, callback) => {
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          username,
          passwordHash: hash
        });
      })
      // callback - 1st arg is err, i.e. if user does not exist
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        // ...
        callback(error);
      });
  })
);

passport.use(
  'login',
  new LocalStrategy((username, password, callback) => {
    let user;
    User.findOne({
      username
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error('Passwords don\'t match'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);