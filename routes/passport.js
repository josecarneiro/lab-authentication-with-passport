'use strict';

const express = require("express");
const passportRouter = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Require user model

// Add bcrypt to encrypt passwords

// Add passport 
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post('/signup', passport.authenticate('signup', {
  successRedirect: "/private-page",
  failureRedirect: "/signup"
}));

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post('/login', passport.authenticate('login', {
  successRedirect: "/private-page",
  failureRedirect: "/login"
}));

const ensureLogin = require("connect-ensure-login");

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

module.exports = passportRouter;
