const timeoutMiddleware = (timeout) => {
    return (req, res, next) => {
      const requestTimeout = setTimeout(() => {
        const error = new Error('Request Timeout');
        error.statusCode = 408; // 408 Request Timeout
        next(error);
      }, timeout);
  
      res.on('finish', () => {
        clearTimeout(requestTimeout);
      });
  
      next();
    };
  };
  
  module.exports = timeoutMiddleware;
  