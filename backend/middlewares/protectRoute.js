import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// we take token if no token so no login , if token verify user id and find in db ,if it exist then selected operation will be performed
const protectRoute=async(req,res,next)=>{
    
    // next means if we send request to follow/:id then firs this function will run and then next will call another function

    try{

        const token=req.cookies.jwt;  // jwt is the name of token we pit in generate token and set cookie file

        if(!token){

            return res.status(400).json({
                message:"Unauthorized"
            })
        }

        // decode jwt token

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        // here we want to just return user but not  password

        const user=await User.findById(decoded.userId).select("-password");  // user id is the payload we put in token i.e the params in generateToken and setCookie

        req.user=user;  // inside req object we are adding user field and it is the user we got from db 

        next();  // call the next middleware or next function
    }

    catch(error){
        res.status(500).json({
            message:error.message,
        })

        console.error('Error in folowing user ', error.message);
        console.log('req.body:', req.body);
    }
}

export default protectRoute;