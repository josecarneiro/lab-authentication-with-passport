'use strict';

const { Router } = require('express');
const passportRouter = Router();
const passport = require('passport');

// Require user model

// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private', ensureLogin.ensureLoggedIn(), (req, res, next) => {
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
    failureRedirect: '/sign-in'
  })
);

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

passportRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/sign-up'
  })
);

passportRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;
