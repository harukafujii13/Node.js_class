// const router = require("express").Router();
const { getAllRecipe } = require("../controllers/receipe.controoler");

router.get("/", getAllRecipe);

// router.get("/save", getRecipeForm).post('/save', saveRecipe)

module.exports = router;
