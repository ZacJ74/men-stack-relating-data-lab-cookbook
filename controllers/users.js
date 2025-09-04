// controllers/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Recipe = require('../models/recipe.js'); 



// Community Index Page (GET)
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render('users/index.ejs', {
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// Show Route
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const recipes = await Recipe.find({ owner: req.params.userId });
    res.render('users/show.ejs', {
      user: user,
      recipes: recipes,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/users');
  }
}
);



module.exports = router;