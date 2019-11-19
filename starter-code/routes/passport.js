'use strict';

const {
  Router
} = require('express');
const passportRouter = Router();

// Add bcrypt to encrypt passwords

const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

passportRouter.get(
  '/private',
  ensureLogin.ensureLoggedIn('autentication/login'),
  (req, res, next) => {
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);

// Add a new route to your passportRouter.js file with the path /signup and point it to your views/passport/signup.hbs file.
passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});

passportRouter.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/private',
    failureRedirect: '/signup'
  })
);


// let's add one GET route to our router to display the login page. views/passport/login.hbs is empty so let's fill it with some login form. Once we have the form, let's add another route to the router to receive that data and log the user in. The form should make a POST request to /login.

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/private',
    failureRedirect: '/login'
  })
);


module.exports = passportRouter;