import _ from 'lodash';

export const SESSION_SECRET = _.defaultTo(process.env.SESSION_SECRET, 'secret');
