// const RecipeController = {
//   getAllRecipe: (req, res, next) => {
//talk to model, to get all recipes ---> const allRecipes = getAllRecipes()
//res.render('file', {allRecipes})
//   },
// };

const Recipe = require("../models/recipe.model");

const getAllRecipe = (req, res, next) => {
  Recipe.fetchAllRecipes((recipeData) => {
    if (recipeData.message) {
      // this is error
    }
    res.json(recipeData);
  });
};

// const getAllRecipeForm = (req, res, next) => {
//talk to model, to get all recipes ---> const allRecipes = getAllRecipes()
//res.render('file', {allRecipes})
// };

// const saveRecipe = (req, res, next) => {};

module.exports = {
  getAllRecipe,
  // createRecipe,
  // saveRecipe
};
