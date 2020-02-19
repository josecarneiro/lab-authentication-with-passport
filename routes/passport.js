'use strict';

const { Router } = require('express');
const passportRouter = Router();

const passport = require('passport');
// Require user model

// Add bcrypt to encrypt passwords

// Add passport
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

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

module.exports = passportRouter;
