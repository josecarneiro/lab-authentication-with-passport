'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('./../models/user');

// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

// Add passport
const passport = require('passport');
const passportLocal = require('passport-local');
const PassportLocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

const signUpStrategy = new PassportLocalStrategy({}, (username, password, callback) => {
  User.findOne({ username })
    .then(user => {
      if (user) {
        new Promise.reject(new Error('USERNAME_ALREADY_EXISTS'));
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then(hashPassword => {
      return User.create({
        username,
        passwordHash: hashPassword
      });
    })
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

const signInStrategy = new PassportLocalStrategy({}, (username, password, callback) => {
  let user;
  User.findOne({ username })
    .then(doc => {
      user = doc;
      if (doc) {
        return bcrypt.compare(password, user.passwordHash);
      } else {
        return new Promise.reject(new Error('YOU ARE NOT REGISTERED'));
      }
    })
    .then(match => {
      if (match) {
        callback(null, user);
      } else {
        return new Promise.reject(new Error('YOUR PASSWORD IS INCORRECT'));
      }
    })
    .catch(error => {
      callback(error);
    });
});


passport.use('sign-up', signUpStrategy);
passport.use('sign-in', signInStrategy);


module.exports = passportRouter;
