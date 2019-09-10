'use strict';

const express = require("express");
const passportRouter = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Require user model
// Add bcrypt to encrypt passwords
// Add passport 
const ensureLogin = require("connect-ensure-login");

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});

passportRouter.get('/signup', (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.get('/success', (req, res, next) => {
  res.render("passport/success");
});

passportRouter.post('/signup', passport.authenticate('signup', {
  successRedirect: "/success",
  failureRedirect: "/signup"
}));

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post('/login', passport.authenticate('login', {
  successRedirect: "/success",
  failureRedirect: "/login"
}));



module.exports = passportRouter;
