'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('../models/user');

// Add bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

// Add passport
const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

passportRouter.post('/sign-up', passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/sign-up'
  })
);

passportRouter.get('/sign-in', (req, res, next) => {
  res.render('passport/sign-in');
});

passportRouter.post('/sign-in', passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/sign-in'
  })
);

module.exports = passportRouter;
