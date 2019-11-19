"use strict";

const { Router } = require("express");
const passportRouter = Router();

// Require user model
const User = require("../models/user");
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

passportRouter.get("/sign-up", (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post(
  "/sign-up",
  passport.authenticate("sign-up", {
    successRedirect: "/private-page",
    failureRedirect: "/sign-up"
  })
);

passportRouter.get("/sign-in", (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post(
  "/sign-in",
  passport.authenticate("sign-in", {
    successRedirect: "/private-page",
    failureRedirect: "/sign-in"
  })
);

passportRouter.post("/sign-out", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = passportRouter;
