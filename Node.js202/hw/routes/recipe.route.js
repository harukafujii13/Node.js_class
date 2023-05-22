const router = require('express').Router()
const { getAllRecipe, getAddRecipePage, postAddRecipe } = require('../controllers/recipe.controller')

router.get('/', getAllRecipe)

router.route('/save').get(getAddRecipePage).post(postAddRecipe)
// router.post('/save', postAddRecipe)

module.exports = router