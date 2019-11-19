"use strict";

const { Router } = require("express");
const passportRouter = Router();
const mongoose = require("mongoose");

const User = require("../models/user"); // Require user model

const bcrypt = require("bcryptjs"); // Add bcrypt to encrypt passwords

const passport = require("passport"); // Add passport

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

passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup");
});

passportRouter.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/passport/private-page",
    failureRedirect: "/passport/signup"
  })
);

passportRouter.get("/sign-in", (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post(
  "/sign-in",
  passport.authenticate("sign-in", {
    successRedirect: "/passport/private-page",
    failureRedirect: "/passport/sign-in"
  })
);

module.exports = passportRouter;
//module.exports = bcrypt;
