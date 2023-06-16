const { body } = require('express-validator');

const userPostRequest = [
  body('user.email')
    .isEmail()
    .withMessage('Provide valid email')
    .toLowerCase()
    .escape(),
  body('user.password')
    .exists()
    .withMessage('Password is require')
    .isString()
    .withMessage('Password must be string')
    .isLength({
      min: 10,
      max: 20,
    }),
  body('user.name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be string')
    .escape(),
  body('user.lastname')
    .exists()
    .withMessage('Lastname is required')
    .isString()
    .withMessage('Lastname should be string.')
    .escape(),
];

module.exports = userPostRequest;
