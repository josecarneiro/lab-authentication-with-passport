'use strict';

const {
  Router
} = require('express');
const passportRouter = Router();

// Require user model
// const User = require('./../models/user');

// Add bcrypt to encrypt passwords
// const bcryptjs = require('bcryptjs');

// Add passport
const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

//@GET    /signup
//@desc   render sign-up page
//@access public
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});


//@POST    /signup
//@desc   create new user with passport.local
//@access public
passportRouter.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  })
);


//@GET    /login
//@desc   render sign-up page
//@access public
passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});


//@POST    /login
//@desc   log in user
//@access public
passportRouter.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/private-page',
    failureRedirect: '/login'
  })
);


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

module.exports = passportRouter;