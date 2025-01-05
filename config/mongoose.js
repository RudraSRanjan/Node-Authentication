import mongoose from "mongoose";

const url= process.env.MongoUrl;

export const connectUsingMongoose= async()=>{

    try {
        await mongoose.connect(url);

        console.log("MongoDB using mongoose is connected");
        
    } catch (error) {
        
        console.log(error);
        console.log("Error Conncting to MongoDB");
    }
}