import mongoose from "mongoose";

const recipeSchema=mongoose.Schema(
    {
        name:{
            type:String, 
            required:[true, "Recipe name must be filled."]
        },
        ingredients:{
            type:Array, 
            required:[true, "Ingredients must be filled."]
        },
        instructions:{
            type:String, 
            required:[true, "Instructions must be filled."]
        },
        imageUrl:{
            type:String, 
            required:[true, "Image URL must be filled."]
        },
        cookingTime:{
            type:Number, 
            required:[true, "Cooking time must be filled."]
        },
        userID:{
            type:mongoose.Schema.Types.ObjectId, 
            required:true, 
            ref:"User"
        }
    }, 
    {
        timestamps:true
    }
);

const recipe=mongoose.model("recipe", recipeSchema);

export {recipe};