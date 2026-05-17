// src/services/recipeService.js
// Purpose: Contains business logic (validation, data processing) - 3-Tier Architecture requirement

const Recipe = require('../models/Recipe');

/**
 * Service layer handles all business logic before interacting with database
 * Controllers will call these functions - they don't contain business logic
 */

// Get all recipes with optional category filter
const getAllRecipes = async (category) => {
    // Build filter object based on category
    let filter = {};
    if (category) {
        filter.category = category;  // Filter by category if provided
    }
    
    // Fetch recipes from database with filter
    const recipes = await Recipe.find(filter);
    return recipes;
};

// Get single recipe by ID - business logic includes checking if recipe exists
const getRecipeById = async (id) => {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new Error('Recipe not found');  // Business logic: validate existence
    }
    return recipe;
};

// Create new recipe - includes data validation
const createRecipe = async (recipeData) => {
    // Business logic validation 
    if (recipeData.cookingTime <= 0) {
        throw new Error('Cooking time must be a positive number');
    }
    
    // Create and save the recipe
    const recipe = new Recipe(recipeData);
    await recipe.save();
    return recipe;
};

// Update recipe (PATCH) - only update fields that are provided
const updateRecipe = async (id, updateData) => {
    // Check if recipe exists first
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new Error('Recipe not found');
    }
    
    // Business logic: validate cookingTime if it's being updated
    if (updateData.cookingTime !== undefined && updateData.cookingTime <= 0) {
        throw new Error('Cooking time must be a positive number');
    }
    
    // Update only the fields that were sent in the request
    const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        updateData,
        { 
            new: true,           // Return the updated document
            runValidators: true  // Run schema validators on update
        }
    );
    
    return updatedRecipe;
};

// Delete recipe
const deleteRecipe = async (id) => {
    // Check if recipe exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new Error('Recipe not found');
    }
    
    // Delete the recipe
    await Recipe.findByIdAndDelete(id);
    return { message: 'Recipe deleted successfully' };
};

// Export all service functions
module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};