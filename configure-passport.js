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
  User.findById(id)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
});

//CONFIGURE STATREGY------------------------------------------------------------

const PassportLocalStrategy = passportLocal.Strategy;

//SIGN-UP STRATEGY-----------------------------------------------------------------------
passport.use(
  'sign-up',
  new PassportLocalStrategy({}, (username, password, callback) => {
    bcrypt // CRYPT PASSWORD
      .hash(password, 15)
      .then((hashandsalt) => {
        return User.create({
          //CREATE INPUT ON DB
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

//SIGN-IN STRATEGY-----------------------------------------------------------------------

passport.use(
  'sign-in',
  new PassportLocalStrategy({}, (username, password, callback) => {
    let user;
    User.findOne({
      username
    })
      .then((document) => {
        user = document;
        return bcrypt.compare(password, user.passwordHash);
      })
      .then((result) => {
        //WILL SEE THE RESULT OF BCRYPT.COMPARE
        if (result) {
          //IF TRUE RETURN USER
          callback(null, user);
        } else {
          // ELSE ERROR
          return Promise.reject(new Error('Password do not match.'));
        }
      })
      .catch((error) => {
        callback(error);
      });
  })
);
