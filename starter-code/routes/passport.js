"use strict";

const {
  Router
} = require("express");
const passportRouter = Router();

// Require user model
const User = require("./../models/user");

// Add bcrypt to encrypt passwords
const bcryptjs = require("bcryptjs");

// Add passport
const passport = require("passport");

passportRouter.get('authentication/login', (req, res, next) => {
  res.render('./passport/login');
});

passportRouter.post(
  'authentication/login',
  passport.authenticate('login', {
    successRedirect: '/authentication/private-page',
    failureRedirect: '/authentication/login'
  })
);

passportRouter.get('authentication/signup', (req, res, next) => {
  res.render('./passport/signup');
});

passportRouter.post(
  '/authentication/signup',
  passport.authenticate('signup', {
    successRedirect: '/authentication/private-page',
    failureRedirect: '/authentication/signup'
  })
);

passportRouter.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/authentication/login');
});


const ensureLogin = require("connect-ensure-login");

passportRouter.get(
  "/authentication/private-page",
  ensureLogin.ensureLoggedIn("/authentication/login"),
  (req, res, next) => {
    const user = req.user;
    res.render("passport/private", {
      user
    });
  }
);

module.exports = passportRouter;