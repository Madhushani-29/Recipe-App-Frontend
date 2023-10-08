import express from "express";
import {validateToken} from "../Middleware/validateToken.js";
import {getSavedRecipies, getSavedRecipieIDs, getRecipes, removeSavedRecipies, saveRecipies, createRecipe} from "../Controller/recipeController.js"

const recipeRouter=express.Router();

recipeRouter.route("/").get(getRecipes);

//recipeRouter.use(validateToken);

recipeRouter.route("/").post(createRecipe).put(saveRecipies);
recipeRouter.route("/recipes-saved/:id").get(getSavedRecipies);
recipeRouter.route("/recipes-saved").put(removeSavedRecipies);
recipeRouter.route("/recipe-ids-saved/:id").get(getSavedRecipieIDs);
export {recipeRouter};