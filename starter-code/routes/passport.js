'use strict';

const { Router } = require('express');
const passportRouter = Router();


// Require user model
const User = require("../models/user");

// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");

// Add passport
  //router signup
router.get("/signup", (req, res, next) => {
  res.render("passport/signup");
});

router.post("/", (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  User.create({
    username,
    password: bcrypt.hashSync(password, 5)
  }).then(() => {
    res.redirect('/login')
  }).catch(next);
});


const ensureLogin = require('connect-ensure-login');

passportRouter.get(
  '/private-page',
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);

module.exports = router;

