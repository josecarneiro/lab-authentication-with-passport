'use strict';

const { Router } = require('express');
const passportRouter = Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/private-page',
    failureRedirect: '/sign-up'
  })
);
    
passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/private-page',
    failureRedirect: '/login'
  })
);

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;
