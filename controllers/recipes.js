
// controllers
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');



// Index Route (GET /recipes)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.session.user._id });
    res.render('recipes/index.ejs', {
      recipes: recipes,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// New Page Route (GET /recipes/new)
router.get('/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', {
      ingredients: ingredients
    });
  } catch (error) {
    console.log(error);
    res.redirect('/recipes');
  }
});

// Create Route (POST /recipes)
router.post('/', async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      owner: req.session.user._id,
    });
    res.redirect('/recipes');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// Show Route (GET /recipes/:recipeId)
router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
    res.render('recipes/show.ejs', {
      recipe: recipe,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/recipes');
  }
});



// Edit Page Route (GET /recipes/:recipeId/edit)
router.get('/:recipeId/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const ingredients = await Ingredient.find({});
    res.render('recipes/edit.ejs', {
      recipe: recipe,
      ingredients: ingredients
    });
  } catch (error) {
    console.log(error);
    res.redirect('/recipes');
  }
});

// Update Route (PUT /recipes/:recipeId)
router.put('/:recipeId', async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
    res.redirect(`/recipes/${req.params.recipeId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/recipes');
  }
});



// Delete Route (DELETE /recipes/:recipeId)
router.delete('/:recipeId', async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.recipeId });
    res.redirect('/recipes');
  } catch (error) {
    console.log(error);
    res.redirect('/recipes');
  }
});

module.exports = router;




