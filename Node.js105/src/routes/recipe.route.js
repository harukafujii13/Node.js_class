const router = require('express').Router()
const { getAllRecipe, getAddRecipePage, postAddRecipe } = require('../controllers/recipe.controller')

router.get('/', getAllRecipe)

router.get('/save', getAddRecipePage)
router.post('/save', postAddRecipe)

module.exports = router