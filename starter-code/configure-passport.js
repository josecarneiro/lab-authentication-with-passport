const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcrypt = require('bcrypt');



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
  'sign-up',
  new LocalStrategy({ usernameField: 'username' }, (username, password, callback) => {
    bcrypt
      .hash(password, 10)
      .then(hash => {
        return User.create({
          username,
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
  'sign-in',
  new LocalStrategy({ usernameField: 'username' }, (username, password, callback) => {
    let user;
    User.findOne({
      username
    })
      .then(document => {
        user = document;
        return bcrypt.compare(password, user.passwordHash);
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