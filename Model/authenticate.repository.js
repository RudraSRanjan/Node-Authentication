import mongoose from "mongoose";

import {userSchema} from "../Schema/user.schema.js";

const UserModel= mongoose.model("Users",userSchema);


class authenticationRepository{

    async signInConfirm(userName,email)
    {
         try {
                //Find user by email to check if user exists or not
                const user= await UserModel.findOne({email});
        
                if(!user)
                {
                    //Create user and save it in database
                   const newUser= new UserModel({
                    userName:userName,
                   
                    email:email

                });

                console.log(newUser);

                await newUser.save();
                }
        
                

                
                    
                } catch (error) {
                    console.log(error);
                }
    }


    async signInFailed()
    {
        return "Couldn't Log-In!! Try Again";
    }
}

export default authenticationRepository;