// src/routes/recipeRoutes.js
// Purpose: Define API endpoints (HTTP methods routing)

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route definitions - each maps an HTTP verb to a controller method

// GET /recipes - Retrieve all recipes (with optional category filter)
// Example: GET /recipes?category=Italian
router.get('/', recipeController.getAllRecipes);

// POST /recipes - Create a new recipe
// Example: POST /recipes with JSON body containing recipe data
router.post('/', recipeController.createRecipe);

// GET /recipes/:id - Retrieve single recipe by ID

router.get('/:id', recipeController.getRecipeById);

// PATCH /recipes/:id - Update specific fields of a recipe

router.patch('/:id', recipeController.updateRecipe);

// DELETE /recipes/:id - Remove a recipe

router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;