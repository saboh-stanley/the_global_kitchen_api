// src/middleware/errorHandler.js
// Purpose: Global error handler - prevents server from crashing 

/**
 * Global error handling middleware
 * Catches all errors passed from controllers/services
 * Returns proper HTTP status codes instead of crashing the server
 */
const errorHandler = (err, req, res, next) => {
    // Log error for debugging (server-side)
    console.error(` Error: ${err.message}`);
    
    // Default error values
    let statusCode = 500;  // Internal Server Error
    let message = 'Internal Server Error';
    
    // Handle specific error types
    
    // 1. Recipe not found error (from service layer)
    if (err.message === 'Recipe not found') {
        statusCode = 404;  // Not Found
        message = err.message;
    }
    
    // 2. Validation errors (positive number validation, etc.)
    if (err.message.includes('Cooking time must be a positive number')) {
        statusCode = 400;  // Bad Request
        message = err.message;
    }
    
    // 3. MongoDB duplicate key error (code 11000)
    if (err.code === 11000) {
        statusCode = 409;  // Conflict
        message = 'Duplicate entry - this recipe already exists';
    }
    
    // 4. Mongoose validation errors (schema constraints)
    if (err.name === 'ValidationError') {
        statusCode = 400;  // Bad Request
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }
    
    // 5. Invalid MongoDB ID format (CastError)
    if (err.name === 'CastError') {
        statusCode = 400;  // Bad Request
        message = 'Invalid ID format';
    }
    
    // Send formatted error response
    res.status(statusCode).json({
        success: false,
        error: {
            message: message,
            statusCode: statusCode
        }
    });
};

module.exports = errorHandler;