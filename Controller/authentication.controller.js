import authenticationRepository from "../Model/authenticate.repository.js";

class authenticationController{
    constructor()
    {
        this.authRepository= new authenticationRepository();
    }

    async signInSuccess(req,res)
    {
        try {
            //Getting data after google verification
            const data= req.user._json;
            console.log(data);
            
            const {name,email}= data;

            await this.authRepository.signInConfirm(name,email);

           

            req.session.userEmail= email;
            

            //If authentication is valid redirect to Home Page
            res.redirect("/user/homepage");
            
        } catch (error) {
            res.status(404).json({message:error});
        }
    }

    async signInFailure(req,res)
    {
        const result= await this.authRepository.signInFailed();

        res.status(401).render("signIn",{errorMessage:result});
    }
}

export default authenticationController;