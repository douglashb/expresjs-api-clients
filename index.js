require('dotenv')
  .config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
require('./bin/database');
const ApiRoutes = require('./lib/routes/index');
const logger = require('./bin/logger');
const loadErrorHandlers = require('./lib/middleware/errorHandler-middleware');
const {
  APP_KEY,
  APP_PORT,
} = require('./config/app-config');

// Express app
const index = express();

index.use(helmet());
index.use(bodyParser.json());
index.use(cors());
index.use(morgan('combined'));
index.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

index.use(session({
  secret: APP_KEY,
  cookie: {
    maxAge: 60000,
  },
  resave: false,
  saveUninitialized: false,
}));

index.use('/api', ApiRoutes);

loadErrorHandlers(index);

index.listen(APP_PORT, () => {
  logger.warn(`server running on port : ${APP_PORT}`);
  console.log(`server running on port : ${APP_PORT}`);
})
  .on('error', (e) => logger.error(e));
