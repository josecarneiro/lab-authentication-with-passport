'use strict';

const { Router } = require('express');
const router = Router();

const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  // const user = req.user;
  res.render(
    'passport/private'
    // , {
    //   user
    // }
  );
});

router.get('/sign-up', (req, res, next) => {
  console.log(req.user);
  res.render('passport/sign-up');
});

router.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-up'
  })
);

router.get('/sign-in', (req, res, next) => {
  res.render('passport/sign-in');
});

router.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
