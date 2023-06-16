const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../models/user-model');

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: 'user[email]',
    passwordField: 'user[password]',
  },
  (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      }).catch(done);
  },
));
