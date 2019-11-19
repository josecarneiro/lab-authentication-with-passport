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
    new LocalStrategy({
        usernameField: 'username'
    }, (username, password, callback) => {
        bcryptjs
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
                callback(error);
            });
    })
);

passport.use(
    'login',
    new LocalStrategy({
        usernameField: 'username'
    }, (username, password, callback) => {
        let user;
        User.findOne({
                username
            })
            .then(document => {
                console.log('this is the user I found', document)
                user = document;
                return bcryptjs.compare(password, user.passwordHash);
            })
            .then(passwordMatches => {
                if (passwordMatches) {
                    callback(null, user);
                } else {
                    callback(new Error('Password doesnt match'));
                }
            })
            .catch(error => {
                callback(error);
            });
    })
);