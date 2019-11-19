'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('../models/user');

// Add bcrypt to encrypt passwords
const bcryptjs = require('bcryptjs');

// Add passport
const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

// Routes
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post('/passport/signup',passport.authenticate('/passport/signup', {
    successRedirect: '/private-page',
    failureRedirect: '/signup'
  })
);

passportRouter.get('/login', (req, res, next) => {
  res.render('./passport/login');
});

passportRouter.post('/passport/login', passport.authenticate('/passport/login', {
    successRedirect: '/private-page',
    failureRedirect: '/login'
  })
);

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);

passportRouter.post('/signout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;