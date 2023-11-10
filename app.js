import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/tasks.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();

//**************MVC *****************//
config({
    path: "./config.env",
})

app.use(express.json());
app.use(cookieParser());

//ADVANTAGE OF ROUTE-> we can add prefix to every request
app.use("/users",userRouter); 
app.use("/tasks",taskRouter); 

//cors - CROSS ORIGIN RESOURCE SHARING
app.use(cors({
    origin : [process.env.FRONTEND_URL],  //frontend ka url
    methods : ["GET","POST","PUT","DELETE"],  //ye methods allow h
    credentials : true,  //cookies frontend me pass ho jaaye
}));


mongoose.connect(process.env.MONGO_URL,{
    dbname:"backendAPI",
})
.then(()=>console.log("connected"))
.catch((e)=>console.log(e))

app.use(errorMiddleware);


app.listen(process.env.PORT, ()=>{
    console.log("server is running");
})