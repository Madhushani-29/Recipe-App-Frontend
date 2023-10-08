import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:["Email is a mandatory."],
        unique:["Email must be unique."]
    },
    password:{
        type:String,
        required:["Password is a mandatory."],
        unique:["Password must be unique."]
    },
    savedRecipes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"recipe"
    }]
},
{
    timestamps:true
}
);

const User=mongoose.model("User", userSchema)

export {User};