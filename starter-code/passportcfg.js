// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// const User = require('./models/user');

// passport.serializeUser((user, callback) => {
//   callback(null, user._id);
// });

// passport.deserializeUser((id, callback) => {
//   User.findById(id)
//     .then(user => {
//       callback(null, user);
//     })
//     .catch(error => {
//       callback(error);
//     });
// });

// passport.use(
//   'sign-up',
//   new LocalStrategy(
//     { username: 'username' },
//     (username, password, callback) => {
//       bcrypt
//         .hash(password, 10)
//         .then(hash => {
//           return User.create({
//             username,
//             passwordHash: hash
//           });
//         })
//         .then(user => {
//           callback(null, user);
//         })
//         .catch(error => {
//           // ...
//           callback(error);
//         });
//     }
//   )
// );

// passport.use(
//   'sign-in',
//   new LocalStrategy(
//     { username: 'username' },
//     (username, password, callback) => {
//       let user;
//       User.findOne({
//         username
//       })
//         .then(document => {
//           user = document;
//           return bcrypt.compare(password, user.passwordHash);
//         })
//         .then(passwordMatchesHash => {
//           if (passwordMatchesHash) {
//             callback(null, user);
//           } else {
//             callback(new Error('Passwords dont match'));
//           }
//         })
//         .catch(error => {
//           callback(error);
//         });
//     }
//   )
// );
