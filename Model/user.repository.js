import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {userSchema} from "../Schema/user.schema.js";
import nodemailer from "nodemailer";


//Create UserModel using userSchema
const UserModel= mongoose.model("Users",userSchema);


//Creating class User Repository to implement all functionalities
class UserRepository{

    async signUp(userName, password,email)
    {
        try {

            if(password=="")
            {
                return "Password can't be empty"
            }
            //Checking if there is an existing user with email specified
            const oldUser= await UserModel.findOne({email:email});

            //If user exists
            if(oldUser)
            {
                return "User already registered. Kindly Sign In";
            }

            //If user doesn't exists
            //Hash the password and create a new user
            const hashedPassword=  await bcrypt.hash(password,10);

            const newUser= new UserModel({
                
                userName:userName,
                password:hashedPassword,
                email:email,
               
            });

            await newUser.save();
            return newUser;
            
        } catch (error) {
            
            console.log(error);
        }
    }

    async signIn(email,password)
    {
        try {

            if(password=="")
                {
                    return "Password can't be empty"
                }
        //Find user by email to check if user exists or not
        const user= await UserModel.findOne({email:email});

        if(!user)
        {
            return "User Doesn't Exists. Kindly Check the Email";
        }

        //Check if password entered is correct or not
        const checkPassword= await bcrypt.compare(password, user.password);

        if(!checkPassword)
        {
            return "Invalid Credentials";
        }
            
        } catch (error) {
            console.log(error);
        }
       


    }

    async forgetPassword(email)
    {
        try {
            //find user by email
            const user= await UserModel.findOne({email});

            if(!user)
            {
                return {message:"User Not found. Check the Email!",
                    status:400
                };
            }

            //Create a random password
            const chars= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            //Setting length pf password to be 10
            let length=10;

            let password="";

            for(let i=0;i<=length;i++)
            {
                const randomIndex= Math.floor(Math.random()*chars.length);
                password+=chars[randomIndex];
            }

            console.log(password);

            //Hash the random password
            const newPassword= await bcrypt.hash(password,10);


            user.password=newPassword;
            await user.save();

            //Setup nodemailer transporter
            const transporter= nodemailer.createTransport({
                service: "Gmail",
                auth:{
                    user:process.env.user,
                    pass:process.env.pass
                }});

            //Email options
            const mailOptions={
                from:process.env.fromEmail,
                to:process.env.toEmail,
                subject:"Password Forget Request",
                text:`Your Password is: ${password}`
            };
            
            //Send the mail
            await transporter.sendMail(mailOptions);

            return {message:"New Password Send. Check Your Email",
                status:200
            };;

            
        } catch (error) {
           console.log(error);
        }
    }

    async resetPassword(email,prevPassword,recentPassword)
    {
        try {
            //Find the user by email
            const oldUser= await UserModel.findOne({email});
            
            

            //Compare prevPassword with existing user password
            const comparePassword=  bcrypt.compare(prevPassword,oldUser.password);

            if(!comparePassword)
            {
                return "Passwords doesn't match. Kindly enter correct password";
            }

            //Creating a hashed password 
            const newPassword= await bcrypt.hash(recentPassword,10);

            //Replacing the old password with new password
            oldUser.password= newPassword;

            //SAving old user in database with updated password
            await oldUser.save();
            return "Password Changed Successfully";

            
        } catch (error) {
            console.log(error);
        }
    }

}

export default UserRepository;