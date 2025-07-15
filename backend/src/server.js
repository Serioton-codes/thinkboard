import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5001
const __dirname=path.resolve();

//middleware used to obtain req.body and destructure it
if(process.env.NODE_ENV!=="production"){
    app.use(cors({
        origin:"http://localhost:5001"
    }));
}
app.use(express.json());
app.use(rateLimit);

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
};
// app.use("/api/payments",paymentRoutes);
// app.use("/api/post",postRoutes);

connectDB().then(()=>{
    app.listen(PORT ,()=>{
        console.log("Server is started on PORT: ",PORT);
    });
});

