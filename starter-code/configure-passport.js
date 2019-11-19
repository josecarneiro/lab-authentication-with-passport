const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');



router.post(
  '/signup',
  passport.authenticate('signup', {
    successRedirect: '/private',
    failureRedirect: '/signup'
  })
);