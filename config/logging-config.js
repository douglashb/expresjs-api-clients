const _ = require('lodash');
const path = require('path');

const LOG_DIRECTORY = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('logs'));

module.exports = { LOG_DIRECTORY };
