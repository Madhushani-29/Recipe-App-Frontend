import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const validateToken=asyncHandler(async(req, res, next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ") [1];
        jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded)=>{
                if (err){
                    res.status(404);
                    throw new Error("User not authorized.");
                }
                req.user=decoded.user;
                next();
            } 
        );
        
        if(!token){
            res.status(404);
            throw new Error("User unauthorized or token is missing.");
        }
    }
});

export {validateToken};