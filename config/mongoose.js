import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const url= "mongodb+srv://ruddraranjan:passw0rd@node.oxxxh.mongodb.net/?retryWrites=true&w=majority&appName=Node";

export const connectUsingMongoose= async()=>{

    try {
        await mongoose.connect(url);

        console.log("MongoDB using mongoose is connected");
        
    } catch (error) {
        
        console.log(error);
        console.log("Error Conncting to MongoDB");
    }
}