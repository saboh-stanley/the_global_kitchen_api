// server.js
// Entry point - starts the server 
// The Global Kitchen API - RESTful API for digital cookbook

// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');
const recipeRoutes = require('./src/routes/recipeRoutes');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables from .env file 
dotenv.config();

// Create Express application
const app = express();

// ============ MIDDLEWARE ============
// Body parser middleware - allows us to read JSON in request body
app.use(express.json());

// Logging middleware - shows all incoming requests (for debugging)
app.use((req, res, next) => {
    console.log(` ${req.method} ${req.url}`);
    next();
});

// ============ ROUTES ============
// Mount recipe routes at /api/recipes
// All recipe endpoints will start with /api/recipes
app.use('/api/recipes', recipeRoutes);

// Test route to confirm API is working
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'The Global Kitchen API is running!',
        endpoints: {
            GET: '/api/recipes?category=optional',
            POST: '/api/recipes',
            PATCH: '/api/recipes/:id',
            DELETE: '/api/recipes/:id'
        }
    });
});

// ============ ERROR HANDLING ============
// Handle 404 - Route not found (when user requests endpoint that doesn't exist)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: {
            message: `Route not found: ${req.method} ${req.url}`,
            statusCode: 404
        }
    });
});

// Global error handler (prevents server from crashing)
app.use(errorHandler);

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

// Connect to MongoDB then start server
// This ensures database connects before accepting requests
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
        console.log(` API URL: http://localhost:${PORT}/api/recipes`);
        console.log(` Health check: http://localhost:${PORT}/api/health`);
    });
});