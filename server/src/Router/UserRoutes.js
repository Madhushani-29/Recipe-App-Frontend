import express from "express";
import {userRegister, userLogin, currentUser} from "../Controller/userController.js";
import {validateToken} from "../Middleware/validateToken.js";

const userRouter=express.Router();

userRouter.route("/login").post(userLogin);

userRouter.route("/register").post(userRegister);

userRouter.route("/currentUser").get(validateToken, currentUser);

export {userRouter};