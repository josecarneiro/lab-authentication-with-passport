'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('./../models/user');

// Add bcrypt to encrypt passwords

const bcrypt = require('bcrypt');

// Add passport
const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

passportRouter.get(
  '/private',
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    console.log(req.user)
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);

passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post(
  '/signup',
  passport.authenticate('sign-up', {
    successRedirect: '/private',
    failureRedirect: '/signup'
  })
);

// passportRouter.get(
//   '/signup',
//   (req, res, next) => {
//     const user = req.user;
//     res.render('passport/signup', {
//       user
//     });
//   }
// );

// passportRouter.post('/signup', (req, res, next) => {
//   const { username, password } = req.body;
//   bcrypt
//     .hash(password, 10)
//     .then(hash => {
//       return User.create({
//         username: username,
//         passwordHash: hash
//       });
//     })
//     .then(user => {
//       console.log('Created user', user);
//       req.session.user = user._id;
//       res.redirect('/');
//     })
//     .catch(error => {
//       next(error);
//     });
// });

passportRouter.get(
  '/login',
  (req, res, next) => {
 
    res.render('passport/login');
  }
);

passportRouter.post(
  '/login',
  passport.authenticate('sign-in', {
    successRedirect: '/private',
    failureRedirect: '/login'
  })
);


module.exports = passportRouter;
