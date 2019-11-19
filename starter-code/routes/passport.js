'use strict';

const {
  Router
} = require('express');
const passportRouter = Router();

// Require user model

// Add bcrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Add passport
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/private-page',
    failureRedirect: '/signup'
  })
);

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post('/login', (req, res, next) => {
  passport.authenticate('login', {
    successRedirect: '/private-page',
    failureRedirect: '/'
  })
});

const ensureLogin = require('connect-ensure-login');

passportRouter.get(
  '/private-page',
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);

module.exports = passportRouter;