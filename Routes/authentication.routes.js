import express from "express";
import authenticationController from "../Controller/authentication.controller.js";
import passport from "passport";

//Create Authentication router
const authenticateRouter= express.Router();

const authController= new authenticationController();

authenticateRouter.get("/google",
    passport.authenticate("google",{scope:["email","profile"]})
);

authenticateRouter.get("/google/callback",
    passport.authenticate("google",{
        successRedirect:"/auth/login/success",
        failureRedirect:"/auth/login/failure"
    })
);


authenticateRouter.get("/login/success",(req,res,next)=>{
    authController.signInSuccess(req,res,next)
}
);
authenticateRouter.get("/login/failure",(req,res,next)=>{
    authController.signInFailure(req,res,next)
}
);


export default authenticateRouter;