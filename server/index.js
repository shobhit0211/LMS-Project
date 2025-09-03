import express from "express";
import dotenv from "dotenv";
import {connectDB} from './database/db.js';
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";   
import cors from "cors";

dotenv.config({});

//Call Database Connection here
connectDB();

const app = express();

 const PORT = process.env.PORT || 3000;
 
 // default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

 //APIs
app.use("/api/v1/user", userRoute);

app.get("/home", (req, res) => {
    res.status(200).json({
        success:true,
        message:"Hello! i am coming from backend"
    })
});

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})

