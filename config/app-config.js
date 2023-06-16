const _ = require('lodash');

const APP_ENV = _.defaultTo(process.env.APP_ENV, 'local');
const APP_KEY = _.defaultTo(process.env.APP_KEY, 'secret');
const APP_PORT = _.defaultTo(process.env.APP_PORT, 4000);
const APP_DEBUG = _.defaultTo(process.env.APP_DEBUG, false);
const IS_PRODUCTION = APP_ENV === 'production';
const JWT_SECRET = _.defaultTo(process.env.JWT_TOKEN, '');

module.exports = {
  APP_ENV,
  APP_KEY,
  APP_PORT,
  APP_DEBUG,
  IS_PRODUCTION,
  JWT_SECRET,
};
