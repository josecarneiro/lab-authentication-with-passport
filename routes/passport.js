'use strict';

const { Router } = require('express');

const passportRouter = new Router();

// Require user model
const bcryptjs = require('bcryptjs');

// Add bcrypt to encrypt passwords
const User = require('./../models/user');

const routeGuard = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(new Error('USER_NOT_AUTHORIZED'));
  }
};

// Add passport
const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/passport/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

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
