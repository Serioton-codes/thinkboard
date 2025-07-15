import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connect to database server");
    }
    catch(error){
        console.error("error while connecting to database",error);
        process.exit(1);//exit with failure.
    }
}