// const express=require("express");

// instead of doing like this import it as module by typing into package.json file 

// "type":"module"

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";  // if we are importing from a file use js at end
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {v2 as cloudinary} from "cloudinary";
import cors from 'cors'
// import cors from 'cors'; 

dotenv.config();  // take port from .env file

connectDB();

const app=express();

const PORT=process.env.PORT || 5000;

// const cors = require("cors");

// cloudinary config

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
// middleware : a function that runs b/w req and res

// app.use(express.json());  // express.json allows to parse incoming data from request (to parse json data in req.body)
app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({extended:false}));  // to parse form data in req.body (url encoded is used to parse form data in req.body ,but if we send true if we send nested objects it will be able to parse it without any problem )

app.use(cookieParser());  // allow us to get the cookie from req and send the cookie inside response

app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
  

  
// routes

app.use("/api/users",userRoutes);  // user routes means age jo bhi part connect hoga usse koi particular data ka crud operation hoga

app.use("/api/posts",postRoutes);

app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));