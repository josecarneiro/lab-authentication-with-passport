'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model

// Add bcrypt to encrypt passwords

// Add passport
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

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

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

passportRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;
