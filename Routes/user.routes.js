import express from "express";
import UserController from "../Controller/user.controller.js";

const userController= new UserController();

//Create user router 
const userRouter= express.Router();

userRouter.get("/signUp",(req,res,next)=>
    {
        userController.getSignUp(req,res,next)
    });
userRouter.get("/signIn",(req,res,next)=>
{
    userController.getSignIn(req,res,next)
});   

userRouter.get("/resetPassword",(req,res,next)=>
{
    userController.changePassword(req,res,next)
});

userRouter.get("/forgetPassword",(req,res,next)=>
{
     userController.forgetPassword(req,res,next)
});

userRouter.get("/homepage",(req,res,next)=>
{
    userController.getHomePage(req,res,next)
});
    

userRouter.post("/signUp",(req,res,next)=>
{
    userController.signUp(req,res,next)
});

userRouter.post("/signIn",(req,res,next)=>
{
    userController.signIn(req,res,next)
});

userRouter.post("/resetPassword",(req,res,next)=>
{
    userController.resetPassword(req,res,next)
});

userRouter.post("/forgetPassword",(req,res,next)=>
    {
        userController.forgetPassword(req,res,next)
    });

userRouter.post("/signOut", (req,res,next)=>
    {
        userController.signOut(req,res,next)
    });


export default userRouter;





