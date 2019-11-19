'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('../models/user'); 
// Add bcrypt to encrypt passwords
const bcryptjs = require("bcryptjs");
// Add passport
const passport = require("passport");

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

passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post('/signup',
  passport.authenticate('/signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  })
);

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// passportRouter.post('/sign-out', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// });

module.exports = passportRouter;
