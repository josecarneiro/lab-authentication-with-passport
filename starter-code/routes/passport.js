"use strict";

const {
  Router
} = require("express");
const passportRouter = Router();

// Require user model
const User = require("./../models/user");

// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

// Add passport
const passport = require("passport");

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

// Sign Up
passportRouter.get("/signup", (req, res, next) => {
  res.render("passport/signup.hbs");
});

passportRouter.post("/signup", (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then(hash => {
      return User.create({
        username,
        passwordHash: hash
      });
    })
    .then(user => {
      console.log("Created user", user);
      req.session.user = user._id;
      res.redirect("/");
    })
    .catch(error => {
      next(error);
    });
});

// Sign In
passportRouter.get("/login", (req, res, next) => {
  res.render("passport/login");
});

passportRouter.post("/login", (req, res, next) => {
  let userId;
  const {
    username,
    password
  } = req.body;
  User.findOne({
      username
    })
    .then(user => {
      if (!user) {
        return Promise.reject(new Error("There's no user with that username."));
      } else {
        userId = user._id;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = userId;
        console.log(req.session.user);
        res.redirect("/");
      } else {
        return Promise.reject(new Error("Wrong password."));
      }
    })
    .catch(error => {
      next(error);
    });

  // Sign Out
  passportRouter.post('/signout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = passportRouter;