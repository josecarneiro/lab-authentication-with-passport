"use strict";

const passport = require("passport");

const { Router } = require("express");

const passportRouter = Router();

const bcryptjs = require("bcryptjs");

const User = require("./../models/user");

const ensureLogin = require("connect-ensure-login");

passportRouter.get(
  "/private",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const user = req.user;
    res.render("passport/private", {
      user
    });
  }
);

passportRouter.get("/login", (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/private",
    failureRedirect: "/login"
  })
);

passportRouter.get("/sign-up", (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post(
  "/sign-up",
  passport.authenticate("sign-up", {
    successRedirect: "/private",
    failureRedirect: "/sign-up"
  })
);

// router.post('/sign-out', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// });

module.exports = passportRouter;
