// logger.js
const fs = require('fs');

function requestLogger(req, res, next) {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFile('logs.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  next();
}

module.exports = requestLogger;
