import mongoose from "mongoose";

//to use database MongoDB
//create a schema
//then create the model based on that schema


const noteSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        }, 
        content:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);

const Note= new mongoose.model("Note",noteSchema);

export default Note;