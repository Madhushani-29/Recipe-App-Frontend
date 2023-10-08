import mongoose from "mongoose";
import {User} from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc register new users
//@route /users/register
//@access public
const userRegister=asyncHandler(async(req, res)=>{
    const {email, password}=req.body;
    if (!email || !password){
        res.status(400);
        throw new Error ("Email and password are mandotary.");
    }
    const emailAvailability=await User.findOne({email});

    if (emailAvailability){
        res.status(400);
        throw new Error("Email already registered.");
    }

    const hashedPassword=await bcrypt.hash(password, 10);
    const user=await User.create({email, password:hashedPassword});

    if (user){
        res.status(200).json({id:user._id, email:user.email, password:user.password});
    }
    else{
        res.status(400);
        throw new Error("User data are nto valid.");
    }
    
});

//@desc login registered users
//@route /users/login
//@access public
const userLogin=asyncHandler(async(req, res)=>{
    const {email, password}=req.body;
    if (!email || !password){
        res.status(400);
        throw new Error ("Email and password are mandotary");
    }

    const emailAvailability= await User.findOne({email});

    if (emailAvailability && (await(bcrypt.compare(password, emailAvailability.password)))){
        const accessToken=jwt.sign(
            {
                user:{
                    id:emailAvailability._id,
                    email:emailAvailability.email, 
                    password:emailAvailability.password
                }
            }, 
            process.env.ACCESS_TOKEN_SECRET, 
            {
                expiresIn:"10m"
            }
        );

        res.status(200).json({"token":accessToken, "id":emailAvailability._id});
    }

    else{
        res.status(400);
        throw new Error("Email or password are invalid.");
    }
});

const currentUser=asyncHandler(async(req, res)=>{
    res.json({email:req.user.email});
});

export {userRegister, userLogin, currentUser};