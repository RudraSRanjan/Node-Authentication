import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import { connectUsingMongoose } from "./config/mongoose.js";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import authenticateRouter from "./Routes/authentication.routes.js";
import userRouter from "./Routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();



//Creating server using express
const server= express();

//Creating Session
server.use(
    session({
        secret:process.env.SecretKey,
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false}
    })
);

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(passport.initialize());
server.use(passport.session());

passport.use(new GoogleStrategy({
    clientID:process.env.ClientID,
    clientSecret:process.env.ClientSecret,
    callbackURL:"http://localhost:4100/auth/google/callback",
    scope:["email","profile"]
},

function(accessToken,refreshToken,profile,callback){
    callback(null,profile);
}

));


//Seriailize the user
passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});

server.set(
    'views',
    path.join(path.resolve(), 'views')
  );
server.use(ejsLayouts);

server.set("view engine","ejs");

server.get("/",(req,res)=>
{
    res.redirect("/user/signUp");
})


server.use("/user",userRouter);
server.use("/auth",authenticateRouter);

server.listen(4100,()=>{
    console.log("Server is listening on port 4100");
    connectUsingMongoose();
})