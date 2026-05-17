// src/routes/recipeRoutes.js
// Purpose: Define API endpoints (HTTP methods routing)

const express = require('express');
const router = express.Router();
// Import the controller - make sure the path is correct
const recipeController = require('../controllers/recipeController');

// Route definitions - each maps an HTTP verb to a controller method

// GET /recipes - Retrieve all recipes (with optional category filter)
router.get('/', recipeController.getAllRecipes);

// POST /recipes - Create a new recipe
router.post('/', recipeController.createRecipe);

// GET /recipes/:id - Retrieve single recipe by ID
router.get('/:id', recipeController.getRecipeById);

// PATCH /recipes/:id - Update specific fields of a recipe
router.patch('/:id', recipeController.updateRecipe);

// DELETE /recipes/:id - Remove a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;