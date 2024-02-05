const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    // Check if the error is a known error type with a specific status code
    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // Handle unexpected errors with a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorMiddleware;
