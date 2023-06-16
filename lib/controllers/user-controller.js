const { validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user-model');
const ResponseHandler = require('../../bin/response-handler');

exports.show = (req, res, next) => {
  res.send('Show User');
};

exports.create = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send(ResponseHandler.badRequest(40, (result.array().shift()).msg));
  }

  const user = new User();

  user.name = req.body.user.name;
  user.lastname = req.body.user.lastname;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  return user.save()
    .then(() => {
      res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  if (!req.body.user.email) {
    res.status(422)
      .json({ errors: { email: 'Can\'t be blank' } });
  }

  if (!req.body.user.password) {
    res.status(422)
      .json({ erros: { password: 'Can\'t be blank' } });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user });
    } else {
      return res.status(422)
        .json(info);
    }
  })(req, res, next);
};
