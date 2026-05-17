// server.js - Entry point
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

// Import modules AFTER dotenv config
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Simple logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Health check route (BEFORE other routes)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'The Global Kitchen API is running!'
    });
});

// Import routes AFTER app is created
const recipeRoutes = require('./src/routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: { message: `Route not found: ${req.method} ${req.url}` }
    });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📚 API URL: http://localhost:${PORT}/api/recipes`);
        console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
});