// src/config/database.js
// Purpose: Single database connection module 

const mongoose = require('mongoose');

/**
 * Connects to MongoDB database
 * Uses async/await to prevent blocking the Event Loop (Non-Blocking I/O requirement)
 */
const connectDB = async () => {
    try {
        // Attempt to connect using MONGODB_URI from .env file
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(` MongoDB Connected Successfully!`);
        console.log(` Database Name: ${conn.connection.name}`);
        console.log(` Connection Host: ${conn.connection.host}`);
        
        return conn;
    } catch (error) {
        console.error(` MongoDB Connection Error: ${error.message}`);
        // Exit process with failure code 
        process.exit(1);
    }
};

// Export the connect function to be used in server.js
module.exports = connectDB;