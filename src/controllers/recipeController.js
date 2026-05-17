// src/controllers/recipeController.js
// Purpose: Handle request/response cycle (3-Tier Architecture requirement)

const recipeService = require('../services/recipeService');

/**
 * Controller methods call the service layer for business logic
 * Controllers do NOT contain business logic - only request/response handling
 */

// GET /recipes - Retrieve all recipes (with optional category filter)
const getAllRecipes = async (req, res, next) => {
    try {
        // Get category from query parameter (e.g., GET /recipes?category=Italian)
        const category = req.query.category;
        
        // Call service layer to get recipes
        const recipes = await recipeService.getAllRecipes(category);
        
        // Send response with status 200 OK
        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        // Pass error to global error handler
        next(error);
    }
};

// GET /recipes/:id - Retrieve single recipe by ID
const getRecipeById = async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getRecipeById(recipeId);
        
        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        next(error);
    }
};

// POST /recipes - Create a new recipe
const createRecipe = async (req, res, next) => {
    try {
        // Extract recipe data from request body
        const recipeData = {
            title: req.body.title,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            cookingTime: req.body.cookingTime,
            difficulty: req.body.difficulty,
            category: req.body.category
        };
        
        // Call service to create recipe
        const newRecipe = await recipeService.createRecipe(recipeData);
        
        // Send response with status 201 Created
        res.status(201).json({
            success: true,
            data: newRecipe
        });
    } catch (error) {
        next(error);
    }
};

// PATCH /recipes/:id - Update specific fields of a recipe
const updateRecipe = async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        const updateData = req.body;  // Only fields sent will be updated
        
        const updatedRecipe = await recipeService.updateRecipe(recipeId, updateData);
        
        res.status(200).json({
            success: true,
            data: updatedRecipe
        });
    } catch (error) {
        next(error);
    }
};

// DELETE /recipes/:id - Remove a recipe
const deleteRecipe = async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        const result = await recipeService.deleteRecipe(recipeId);
        
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        next(error);
    }
};

// Export all controller functions
module.exports.getAllRecipes = getAllRecipes;
module.exports.getRecipeById = getRecipeById;
module.exports.createRecipe = createRecipe;
module.exports.updateRecipe = updateRecipe;
module.exports.deleteRecipe = deleteRecipe;