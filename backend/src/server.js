import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5001


//middleware used to obtain req.body and destructure it
app.use(cors("http://localhost:5001"));
app.use(express.json());
app.use(rateLimit);

app.use("/api/notes",notesRoutes);
// app.use("/api/payments",paymentRoutes);
// app.use("/api/post",postRoutes);

connectDB().then(()=>{
    app.listen(PORT ,()=>{
        console.log("Server is started on PORT: ",PORT);
    });
});

