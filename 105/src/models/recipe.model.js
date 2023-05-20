const uuid = require("uuid").v4();
const fs = require("fs");
const path = require("path");
const { callbackify } = require("util");

const recipeData = require("../data/recipes.json");
const rootDir = require("../utils/path-helpers");
const receipeDataPath = path.join(rootDir, "data", "recipes.json");

module.exports = class Recipe {
  constructor(name, ingredient, instruction) {
    this.id = uuid();
    this.name = name;
    this.ingredient = ingredient;
    this.instruction = instruction;
  }

  save() {
    //this
  }

  static fetchAllRecipes() {
    fs.readFile(receipeDataPath, () => {
      if (err) {
        //pass err object into a centralized error
        callback({ message: "No recipe list", err });
      }

      callbackify(JSON.parse(recipeData));
    });
  }

  static findById() {}
};

Recipes.findAllRecipies(() => {});

new Recipe();

Recipe.findById();
