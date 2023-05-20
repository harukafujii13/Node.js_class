const Recipe = require("../models/recipe");

const getAllRecipe = (req, res, next) => {
  Recipe.fetchAllRecipes((recipeData, err) => {
    if (err) {
      //this is an error
      res.render("error", {
        title: "Something went wrong",
        message: err.message,
      });
    }
    res.render("recipes", { recipes: recipeData, title: "Recipe List" });
  });
};

const getAddRecipePage = (req, res, next) => {
  res.render("create", { title: "New Recipe" });
};

const postAddRecipe = (req, res, next) => {
  console.log(req.body);
  let { name, ingredient, instruction, quantity } = req.body;

  if (!Array.isArray(ingredient)) {
    ingredient = [ingredient];
    quantity = [quantity];
  }

  //The updated code snippet checks if the ingredient property is not an array.
  //If it's not an array, it converts it into an array by wrapping it in square brackets ([ingredient]).
  //It also assigns the corresponding quantity value to a new array, quantity = [quantity].
  //This ensures that both ingredient and quantity variables are always arrays.

  if (!Array.isArray(instruction)) {
    instruction = [instruction];
  }

  const ingredients = ingredient.map((ing, i) => {
    //ingredient ---> ['flour', 'sugar', 'butter']
    //quantity ---> ['1 cup', '4 cups', '1 bar']
    return { name: ing, quantity: quantity[i] };
  });

  const newRecipe = new Recipe(name, ingredients, instruction);
  newRecipe.save(({ message, status }) => {
    if (status === 201) {
      return res.redirect("/recipes");
    }

    res
      .status(status)
      .render("error", { title: "Something went wrong", message });
  });
};

//nside the callback function, it checks the status property received as part of the callback response.
//If the status is equal to 201, indicating a successful save, it redirects the response to the "/recipes" route.

module.exports = {
  getAllRecipe,
  getAddRecipePage,
  postAddRecipe,
};

//memo1
//getAllRecipe: This function is used to fetch all recipes and render them in the "recipes" view.
//It calls the Recipe.fetchAllRecipes method, which fetches the recipes from the data source.
//If there is an error, it renders the "error" view with an error message. Otherwise,
//it renders the "recipes" view with the recipe data.
