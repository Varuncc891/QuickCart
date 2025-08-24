/**
 * Global error handling middleware for Express applications
 * Centralizes error processing and provides consistent API error responses
 */

const errorHandler = (err, req, res, next) => {
  console.error(err); 

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = { errorHandler };
