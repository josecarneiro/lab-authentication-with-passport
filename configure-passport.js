'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');

const LocalStrategy = passportLocal.Strategy;

const User = require('./models/user');

//2. Configure the serialization and deserialization process

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

//3. Configure passport strategies for sign-up and sign-in

passport.use(
  'sign-up',
  new LocalStrategy({}, (username, password, callback) => {
    bcrypt
      .hash(password, 10)
      .then((hashAndSalt) => {
        return User.create({
          username,
          passwordHash: hashAndSalt,
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

passport.use(
  'sign-in',
  new LocalStrategy({}, (username, password, callback) => {
    let user; //instantiating user variable, so the user's document is accessible here
    User.findOne({
      username,
    })
      .then((document) => {
        user = document;
        return bcrypt.compare(password, user.passwordHash);
      })
      .then((result) => {
        if (result) {
          callback(null, user);
        } else {
          return Promise.reject(new Error('The password is incorrect'));
        }
      })
      .catch((error) => {
        callback(error);
      });
  })
);
