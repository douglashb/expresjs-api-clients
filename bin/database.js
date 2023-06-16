const mongoose = require('mongoose');
const logger = require('./logger');
const DB = require('../config/database-config');

const uri = DB.nosql.HOST;
const options = {
  dbName: DB.nosql.DATABASE, // Specifies which database to connect
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
  autoIndex: true,
  maxPoolSize: 10,
  // If not connected, return errors immediately rather than waiting for reconnect
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

logger.debug(uri);

// Create database connection
mongoose.connect(uri, options)
  .then(() => {
    logger.info('Mongoose connection done');
  })
  .catch((e) => {
    logger.info('Mongoose connection error!');
    logger.warn(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${DB.nosql.DATABASE}`);
});

// When connection has an error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`);
});

// When connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// process.kill(process.pid, 'SIGINT');
