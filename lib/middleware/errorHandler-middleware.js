const { IS_PRODUCTION } = require('../../config/app-config');
const logger = require('../../bin/logger');
const ResponseHandler = require('../../bin/response-handler');

// eslint-disable-next-line import/prefer-default-export
const loadErrorHandlers = (app) => {
  // catch 404 erros and forward to error handler
  app.use((req, res, next) => {
    const err = new Error(`Not found ${req.url}`);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
      res.status(400)
        .send(ResponseHandler.badRequest(40, Object.keys(err.errors)
          .reduce((errors, key) => {
            errors = err.errors[key].message;

            return errors;
          }, {})));
      // res.status(400)
      //   .send({
      //     message: Object.keys(err.errors)
      //       .reduce((errors, key) => {
      //         errors[key] = err.errors[key].message;
      //
      //         return errors;
      //       }, {}),
      //     code: err.status,
      //     data: {},
      //   });
    }

    logger.error(err.status);
    res.status(err.status || 500);
    res.send(ResponseHandler.internalError(err.message || err.name));
  });
};

module.exports = loadErrorHandlers;
