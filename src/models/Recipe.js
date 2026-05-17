// src/models/Recipe.js
// Purpose: Defining the BSON schema for MongoDB 

const mongoose = require('mongoose');

// Define the schema with proper BSON data types
const recipeSchema = new mongoose.Schema(
    {
        // Title - required field with string trimming
        title: {
            type: String,
            required: [true, 'Recipe title is required'],
            trim: true,  // Removes whitespace from both ends
            index: true  // INDEXING: defined on field expected for heavy lookup rates
        
        // Ingredients - array of strings (required)
        ingredients: {
            type: [String],  // Array of strings (BSON array type)
            required: [true, 'Ingredients are required'],
            validate: {
                validator: function(ingredients) {
                    return ingredients.length > 0;  // At least one ingredient
                },
                message: 'At least one ingredient is required'
            }
        },
        
        // Instructions - text field
        instructions: {
            type: String,
            required: [true, 'Instructions are required'],
            trim: true
        },
        
        // cookingTime - using explicit number (NOT string) as required by document
        cookingTime: {
            type: Number,
            required: [true, 'Cooking time is required'],
            min: [1, 'Cooking time must be at least 1 minute'],  // Validation rule
            max: [1440, 'Cooking time cannot exceed 1440 minutes (24 hours)']
        },
        
        // difficulty - with enum validation (document requirement)
        difficulty: {
            type: String,
            required: [true, 'Difficulty level is required'],
            enum: {
                values: ['Easy', 'Medium', 'Hard'],
                message: 'Difficulty must be Easy, Medium, or Hard'
            },
            trim: true
        },
        
        // category - for filtering GET /recipes (document requirement)
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
            index: true  // INDEXING: for category filter lookups
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps (BSON Date type)
        timestamps: true
    }
);

// Create and export the Model
const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;