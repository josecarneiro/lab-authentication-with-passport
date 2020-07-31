'use strict';

const { Router } = require('express');
const authenticationRouter = Router();

const passport = require('passport');

//Add a new route handler to your /routes/authentication.js file with the endpoint /sign-up and make it render the template in the /views/authentication/sign-up.hbs file

authenticationRouter.get('/sign-up', (req, res, next) => {
  //console.log('authenticating user');
  res.render('authentication/sign-up');
});

authenticationRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-up',
  })
);

//Add a Sign In feature, by including a GET route handler on our /routes/authentication.js router to display the Sign In page.

authenticationRouter.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

authenticationRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in',
  })
);

module.exports = authenticationRouter;
