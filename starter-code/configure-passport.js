const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');


passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  'signup',
  new LocalStrategy((name, password, callback) => {
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          name,
          passwordHash: hash
        });
      })
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        // ...
        callback(error);
      });
  })
);

passport.use(
  'login',
  new LocalStrategy((name, password, callback) => {
    let user;
    User.findOne({
        name
      })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error('Passwords dont match'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);