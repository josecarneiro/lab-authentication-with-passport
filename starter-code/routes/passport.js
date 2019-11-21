'use strict';

const { Router } = require('express');
const passportRouter = Router();

/* const router = new Router(); */

// Require user model
const User = require("../models/user")
// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require('connect-ensure-login');

const passport = require('passport');

passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post(
  '/signup',
  passport.authenticate('sign-up', {
    successRedirect: 'authentication/private',
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

module.exports = passportRouter;
