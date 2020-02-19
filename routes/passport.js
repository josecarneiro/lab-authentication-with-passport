'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model

const User = require('./../models/user');

// Add bcrypt to encrypt passwords

const bcryptjs = require('bcryptjs');

// Add passport

const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

// passportRouter.post('/sign-up', (req, res, next) => {
//   console.log(req.body);
//   const { username, password } = req.body;

//   bcryptjs
//     .hash(password, 10)
//     .then(hashPlusSalt => {
//       return User.create({
//         username,
//         passwordHash: hashPlusSalt
//       });
//     })
//     .then(user => {
//       res.redirect('/');
//     })
//     .catch(error => {
//       next(error);
//     });
// });

passportRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/sign-up'
  })
);

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

module.exports = passportRouter;
