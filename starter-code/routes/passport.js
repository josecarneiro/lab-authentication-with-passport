'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('./../models/user');

// Add bcrypt to encrypt passwords
const bcryptjs = require('bcryptjs');

// Add passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post('/login',
  passport.authenticate('login', {
    successRedirect: '/private-page',
    failureRedirect: '/login'
  })
);

passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post('/signup',
  passport.authenticate('signup', {
    successRedirect: '/private-page',
    failureRedirect: '/sign-up'
  })
);

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

passportRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;
