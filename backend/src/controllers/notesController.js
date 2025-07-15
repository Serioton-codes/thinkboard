import Note from "../models/Note.js";

export async function getAllNotes(_,res){
    try {
        const note=await Note.find().sort({createdAt:-1});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getNoteById(req,res){
    try {
        const note=await Note.findById(req.params.id);
        if(!note)
            res.status(404).json({message:"Note not found!"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createNote(req,res){
    try {
        const {title,content}=req.body;
        const newNote=new Note({title,content});
        const isSaved=await newNote.save();
        if(!isSaved){
            res.status(500).json({message:"Internal server error"});
        }
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function updateNote(req,res){
    try {
        const {title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,
            {title,content},
            {
                new:true,
            }
        );
        if(!updatedNote)
            res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteNote(req,res){
    try {
        const deletedNote=await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote)
            res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal server error"});
    }
}