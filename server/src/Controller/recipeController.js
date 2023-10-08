import {recipe} from "../Models/recipeModel.js";
import asyncHandler from "express-async-handler";
import {User} from "../Models/userModel.js";

//@desc create new recipes
//@api /recipe
//@access private
const createRecipe=asyncHandler(async(req, res)=>{
    const {name, ingredients, instructions, imageUrl, cookingTime, userID}=req.body; 

    if (!name || !ingredients || !instructions || !imageUrl || !cookingTime || !userID){
        res.status(400);
        throw new Error ("All fields are mandotary.");
    }

    const recipeCreate=await recipe.create({name, ingredients, instructions, imageUrl, cookingTime, userID});

    if (recipeCreate){
        res.json(recipeCreate);
    }

    else{
        res.status(400);
        throw new Error("Recipe details are not valid.");
    }
});

//@desc get all recipes 
//@api /recipe
//@access public
const getRecipes=asyncHandler(async (req, res)=>{
    const recipes= await recipe.find({});

    if(!recipes){
        res.status(404);
        throw new Error("No details found.");
    }

    res.json(recipes);
});

//@desc save favourite recipes
//@api /recipe
//@access private
const saveRecipies =asyncHandler(async (req, res)=>{
    //get userid and recipe id
    const {userID, recipeID}=req.body;
    if(!userID || !recipeID){
        res.status(400);
        throw new Error("User ID and recipe ID are mandotary.");
    }
    //get the user
    const user= await User.findById(userID);
    //push new items to the array
    user.savedRecipes.push(recipeID);
    //save new data
    await user.save();
    res.json(user);
})

//@desc remove saved recipes
//@api /recipe/recipes-saved
//@access private
const removeSavedRecipies =asyncHandler(async (req, res)=>{
    const {userID, recipeID}=req.body;
    const user= await User.findById(userID);
    user.savedRecipes.pull(recipeID);
    await user.save();
    res.json(user);
})

//@desc retrieve saved recipes
//@api /recipe/recipes-saved?:id
//@access private
const getSavedRecipies =asyncHandler(async (req, res)=>{
    const userID=req.params.id;
    if(!userID){
        res.status(400);
        throw new Error("User ID is a  mandotary.");
    }
    const savedRecipeList= await User.findById(userID, {_id:0, savedRecipes:1}).populate("savedRecipes");

    const savedRecipes = savedRecipeList.savedRecipes;
    res.json({ savedRecipes});
})

//@desc retrieve saved recipe IDs
//@api /recipe/recipes-saved
//@access private
const getSavedRecipieIDs =asyncHandler(async (req, res)=>{
    const userID=req.params.id;
    if(!userID){
        res.status(400);
        throw new Error("User ID is a  mandotary.");
    }
    const savedRecipeList= await User.findById(userID, {_id:0, savedRecipes:1});

    const savedRecipeIDs = savedRecipeList.savedRecipes;
    res.json({ savedRecipeIDs});
})

export {createRecipe, getRecipes, saveRecipies, removeSavedRecipies, getSavedRecipies, getSavedRecipieIDs};