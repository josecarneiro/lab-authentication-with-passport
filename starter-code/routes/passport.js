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
const LocalStrategy = require("passport-local").Strategy;

const ensureLogin = require("connect-ensure-login");

passportRouter.get(
  "/private-page",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const user = req.user;
    res.render("passport/private", {
      user
    });
  }
);

/*passportRouter.get("/private-page", (req, res, next) => {
  res.render("passport/private");
}); */

passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post( '/signup',
  passport.authenticate('signup', {
    successRedirect: '/private-page',
    failureRedirect: '/'
}));

passportRouter.get("/login",  (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post('/login',
  passport.authenticate('login', {
    successRedirect: '/private-page',
    failureRedirect: '/'
}));

passportRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;


/*passportRouter.post("/signup") --> basic authentication
 const {
    username,
    password
  } = req.body;

  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        username: username,
        passwordHash: hash
      });
    })
    .then(user => {
      console.log(user);
     // req.session.user = user._id;
      res.redirect("/");
    })
    .catch(error => {
      next(error);
    });
    */