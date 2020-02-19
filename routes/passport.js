'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('./../models/user');

// Add bcrypt to encrypt passwords
const bcryptjs = require('bcryptjs');

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

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

const signInStrategy = new PassportLocalStrategy({}, (username, password, callback) => {
  let user;
  User.findOne({
    username
  })
    .then(document => {
      user = document;
      if (document) {
        return bcryptjs.compare(password, user.passwordHash);
      } else {
        return Promise.reject(new Error('USER_DOES_NOT_EXIST'));
      }
    })
    .then(passwordMatches => {
      if (passwordMatches) {
        callback(null, user);
      } else {
        return Promise.reject(new Error('PASSWORD_DOES_NOT_MATCH'));
      }
    })
    .catch(error => {
      callback(error);
    });
});

passport.use('sign-in', signInStrategy);

passportRouter.get('/sign-in', (req, res, next) => {
  res.render('passport/sign-in');
});

passportRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/passport/sign-in'
  })
);

const signUpStrategy = new PassportLocalStrategy({}, (username, password, callback) => {
  User.findOne({ username })
    .then(user => {
      if (user) {
        const error = new Error('USER_ALREADY_EXISTS');
        return Promise.reject(error);
      } else {
        return bcryptjs.hash(password, 10);
      }
    })
    .then(hash => {
      return User.create({
        username,
        passwordHash: hash
      });
    })
    .then(user => {
      // User was successfully created
      callback(null, user);
    })
    .catch(error => {
      // do something with error
      callback(error);
    });
});

passport.use('sign-up', signUpStrategy);

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

passportRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/passport/sign-up'
  })
);

passportRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;
