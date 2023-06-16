const _ = require('lodash');

const DB = {
  nosql: {
    HOST: _.defaultTo(process.env.MONGODB_URI, 'localhost'),
    DATABASE: _.defaultTo(process.env.MONGODB_NAME, 'name'),
  },
};

module.exports = DB;
