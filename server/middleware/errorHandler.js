const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const details = process.env.NODE_ENV === 'development' ? err.stack : undefined;

    res.status(status).json({
        error: {
            message,
            details,
            status
        }
    });
};

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { errorHandler, AppError }; 