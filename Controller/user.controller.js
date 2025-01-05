import UserRepository from "../Model/user.repository.js";

export default class UserController
{
    constructor()
    {
        this.userRepository= new UserRepository();
    }

    getSignUp(req,res)
    {
        res.render("signUp",{errorMessage:null});
    }

    getSignIn(req,res)
    {
        res.render("signIn",{errorMessage:null});
    }

    getHomePage(req,res)
    {
        const email= req.session.userEmail;
        if(!email)
        {
            return res.render("signIn",{errorMessage:"Kindly Sign In to  view Home Page"});
        }
        res.render("homePage");
    }

    changePassword(req,res)
    {
        const email= req.session.userEmail;
        if(!email)
        {
            return res.render("signIn",{errorMessage:"Kindly Sign In to change the password"});
        }
        res.render("resetPassword",{errorMessage:null});
    }

    forgetPassword(req,res)
    {
        
        res.render("forgetPassword",{errorMessage:null});
    }

    async signUp(req,res)
    {
        try {

            const {userName,password,email}= req.body;

            const user= await this.userRepository.signUp(userName,password,email);

            if(typeof user==="string")
            {
               return res.status(400).render("signUp",{errorMessage:user});
            }

            res.status(201).render("signUp",{errorMessage:"User Created Successfully. Now you can login"});

            
        } catch (error) {
            res.status(404).json({message:error});
        }
    }

    async signIn(req,res)
    {
        try {
            const {email,password}= req.body;

            console.log(password);

            const result= await this.userRepository.signIn(email,password);

            if(typeof result==="string")
            {
                return res.status(401).render("signIn",{errorMessage:result});
            }

            req.session.userEmail=email;
            res.status(200).redirect("/user/homepage");
            
        } catch (error) {
            res.status(404).json({message:error});
        }
    }

    async resetPassword(req,res)
    {
        try {
            const email=req.session.userEmail;
            
            const {prevPassword, recentPassword }= req.body;

            const result= await this.userRepository.resetPassword(email,prevPassword,recentPassword);

            if(typeof result==="string")
            {
                return res.status(401).render("resetPassword",{errorMessage:result});
            }
            
         res.status(201).render("signIn",{errorMessage:result});    
        } catch (error) {
            res.status(500).json({message:error});
        }
    }

    signOut(req,res)
    {
        req.session.destroy((err)=>
        {
            if(err)
            {
                res.status(500).send("Couldn't Sign Out");
            }
            else
            {
                res.status(200).render("signOut",{errorMessage:"Sign Out Successful"});
            }
        })
    }

    async forgetPassword(req,res)
    {
        try {

            const {email}= req.body;

            const result= await this.userRepository.forgetPassword(email);

            if( result.status===404)
            {
                return res.status(404).render("forgetPassword",{errorMessage:result.message})
            }

            res.status(200).render("forgetPassword",{errorMessage:result.message});
            
        } catch (error) {
            res.status(500).json({message:error});
        }
    }
}