import mongoose from "mongoose";

//CReating User Schema
export const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true
       
    },
    password:{
        type:String,
        required:false,
       
    },

    email:{
        type:String,
        required:true,
        unique:true
    }
})