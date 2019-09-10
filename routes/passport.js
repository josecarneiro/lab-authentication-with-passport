'use strict';

const express = require("express");
const passportRouter = express.Router();

// Require user model
const User = require('./../models/user');

// Add bcrypt to encrypt passwords
const bcrypt = require('bcryptjs');

// Add passport
const passport = require('passport');

const ensureLogin = require("connect-ensure-login");

passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});



/* BEGIN ITERATION ONE */

passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post('/signup', passport.authenticate('signup', {
  successRedirect: "/private-page",
  failureRedirect: "/signup"
}));

/* END ITERATION ONE */

/* BEGIN ITERATION TWO */

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post('/login', passport.authenticate('login', {
  successRedirect: "/private-page",
  failureRedirect: "/login"
}));

/* END ITERATION TWO */





module.exports = passportRouter;
