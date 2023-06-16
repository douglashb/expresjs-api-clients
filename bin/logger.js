const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const {
  createLogger,
  format,
  transports,
} = require('winston');
const { APP_ENV } = require('../config/app-config');
const { LOG_DIRECTORY } = require('../config/logging-config');

const dir = LOG_DIRECTORY;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const logLevel = APP_ENV === 'dev' ? 'debug' : 'warm';

const options = {
  file: {
    level: logLevel,
    filename: `${dir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '14d',
  },
};

const logger = createLogger({
  transports: [
    new transports.Console({
      stderrLevels: ['info', 'error'],
      format: format.combine(
        format.errors({ stack: true }),
        format.prettyPrint(),
      ),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false,
});

module.exports = logger;
