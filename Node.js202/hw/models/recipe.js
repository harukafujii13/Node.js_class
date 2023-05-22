const { v4: uuid }  = require('uuid')
const fs = require('fs')
const path = require('path')

const rootDir = require('../utils/path-helper')
const recipesData = require('../data/recipes.json')
const recipesDataPath = path.join(rootDir, 'data', 'recipes.json')

module.exports = class Recipe {
    constructor(name, ingredient, instruction){
        this.id = uuid()
        this.name = name
        this.ingredient = ingredient
        this.instruction = instruction
    }

    save(callback){
        fs.readFile(recipesDataPath, "utf8", (err, data)=> {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }

            const recipes = JSON.parse(data)
            recipes.push(this)

            fs.writeFile(recipesDataPath, JSON.stringify(recipes, null, 2), "utf8", (err) => {
                if(err){
                    callback({ message: "Could not read recipe.json", status: 500 })
                }

                callback({ message: "Recipe saved successfully", status: 201 })
            })
        })
    }

    static fetchAllRecipes(callback){
        fs.readFile(recipesDataPath, (err, data) => {
            if(err){
                callback(null, { message: "No recipe list found", err })
            }

            callback(JSON.parse(data))
        })
    }

    //update

    //delete a recipe

    //delete all recipes
}
