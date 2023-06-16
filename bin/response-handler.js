const jsonResponse = (msg, data, status = 200, code = 0) => ({
  success: status >= 200 && status <= 299,
  locale: 'en',
  message: msg,
  code,
  data,
});

exports.success = (msg, data, code = 0) => jsonResponse(msg, data, 200, code);

exports.badRequest = (code, msg) => jsonResponse(msg, [], 400, code);

exports.internalError = (msg) => jsonResponse(msg, [], 500, 50);
