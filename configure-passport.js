'use strict';

// Passport Strategy configuration
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findOne(id)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
});

//CONFIGURE STATREGY----------------------------------------

const PassportLocalStrategy = passportLocal.Strategy;

passport.use(
  'sign-up',
  new PassportLocalStrategy({}, (username, password, callback) => {
    bcrypt
      .hash(password, 15)
      .then((hashandsalt) => {
        return User.create({
          username,
          passwordHash: hashandsalt
        });
      })
      .then((user) => {
        callback(null, user);
      })
      .catch((error) => {
        callback(error);
      });
  })
);
