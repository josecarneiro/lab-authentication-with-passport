'use strict';

const { Router } = require('express');
const passportRouter = Router();
const passport = require('passport');
// Require user model
const User = require('./../models/user');
// Add bcrypt to encrypt passwords
const bcryptjs = require('bcryptjs');
// Add passport

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('./passport/sign-up');
});

passportRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/passport/sign-up'
  })
);

module.exports = passportRouter;
