'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
// const User = require('./../models/user');

// Add bcrypt to encrypt passwords
// const bcryptjs = require('bcryptjs');

// Add passport
const passport = require('passport');

// const ensureLogin = require('connect-ensure-login');

// passportRouter.get(
//   '/private-page',
//   ensureLogin.ensureLoggedIn(),
//   (req, res, next) => {
//     const user = req.user;
//     res.render('passport/private', {
//       user
//     });
//   }
// );

//@GET    /signup
//@desc   render sign-up page
//@access public
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
  console.log('get request -- /signup SUCCESSFUL');
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

module.exports = passportRouter;
