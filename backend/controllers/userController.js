import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import {v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Post from "../models/postModel.js";

// signup user

const signupUser=async(req,res)=>{

    try{

        const{name,email,username,password}=req.body;  // able to parse this data using middleware express.json()

        // if user has this email or username

        const user=await User.findOne({$or:[{email},{username}]});
        
        if(user){
            return res.status(400).json({
                error:"User already exist",
            })
        }

        // if no user exist whith same email or username

        // hash the password 

        const salt=await bcrypt.genSalt(10);  //more number more secure
        const hashedPassword=await bcrypt.hash(password,salt);

        // crate a new user by this or simply by User.create() method 

        const newUser= new User({
            name,
            email,  // email or email:email is same
            username,
            password:hashedPassword,
        })

        // save in db

        await newUser.save();

        // once a user is created we will generate token and setting cookie 
        if(newUser){

            // after user is created generate token and set cookie

            generateTokenAndSetCookie(newUser._id,res);  // res is passed as cookie is being set inside the response

            res.status(200).json({
                _id:newUser._id,  // _id is given by mongodb (which is wriiten on right side of :)
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
                bio:newUser.bio,
                profilePic:newUser.profilePic,
            })
        }

        else{

            res.status(400).json({
                error:"Invalid user data",
            })
        }
    }

    catch(err){
        res.status(500).json({
            error:err.message,
        })

        console.error('Error in signupUser', err.message);
        console.log('req.body:', req.body);

    }
}

// login user

const loginUser=async(req,res)=>{

    try {
        const{username,password}=req.body;  // able to parse this data using middleware express.json()

        const user=await User.findOne({username});

        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");  // password is entered by user and user?.password that password which is hashed in db and if user does not exist then it wiill give error so do in or as  ""

        // if user is 

        if(!user || !isPasswordCorrect){

            return res.status(400).json({
                error:"Invalid username or password",
            });
        }

        // now as we are authenticated set  ookie

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
            bio:user.bio,
            profilePic:user.profilePic,
        })
    } 
    
    catch (err) {
        
        res.status(500).json({
            error:err.message,
        })

        console.error('Error in loginUser', err.message);
        console.log('req.body:', req.body);
    }
}

// logout user

const logoutUser=(req,res)=>{

    try {

        res.cookie("jwt","",{maxAge:1});  // clear this cookie with name jwt and an empty string and object is like maxAge of 1 ms
        res.status(200).json({
            message:"User logged out sucessfully",
        }) 
    } 
    
    catch (err) {
        res.status(500).json({
            error:err.message,
        })

        console.error('Error in logoutUser', err.message);
        console.log('req.body:', req.body);
    }
}

// followUnfollowUser

const followUnfollowUser=async(req,res)=>{

    try {
        const {id}=req.params;
        const userToModify=await User.findById(id);  // user jisko follow/unfollow karna hai

        const currentUser=await User.findById(req.user._id); // hum jo krna chahta h follow/unfollow

        // if user is trying to follow himself

        if(id===req.user._id.toString())return res.status(400).json({
            message:"You cannot follow/unfollow yourself"
        })

        if(!userToModify || !currentUser)return res.status(400).json({
            message:"User not found"
        })

        // if current user is following then unfollow 

        const isFollowing=currentUser.following.includes(id);

        if(isFollowing){
            // unfollow user
            
            // modify current user following,modify the followers array of userToModify 

            await User.findByIdAndUpdate(req.user._id, {$pull : {following:id}});

            await User.findByIdAndUpdate(id,{$pull : {followers:req.user._id}});
            
            res.status(200).json({
                message:"User Unfollowed successfully",
            })

        }

        else{

            // follow user

            // modify current user following,modify the followers array of userToModify 

            await User.findByIdAndUpdate(req.user._id, {$push : {following:id}});

            await User.findByIdAndUpdate(id,{$push : {followers:req.user._id}});

            res.status(200).json({
                message:"User followed successfully",
            })
        }
    } 
    
    catch (err) {
        res.status(500).json({
            message:err.message,
        })

        console.error('Error in follow/unfollow user', err.message);
        console.log('req.body:', req.body);
    }
}

const updateUser=async(req,res)=>{

    const {name,email,username,password,bio}=req.body;

    let {profilePic}=req.body;  // as we have to change it so that's why let

    const userId=req.user._id;

    try {
        
        let user=await User.findById(userId);
        
        // if user not found

        if(!user){
            return res.status(400).json({
                error:"User not found"
            })
        }

        // toString() done as userId is an object so to compare we have to convert it into id 

        if(req.params.id!==userId.toString()){

            return res.status(400).json({
                error:"You cannot update other user's profile",
            })
        }

        if(password){

            // hash new password

            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            user.password=hashedPassword;
        }

        // if profile pic is provided from frontend then upload to cloudinary

        if(profilePic){

            // agar hum bar bar change krenge to vo bar bar clodunary par upload hogi so add if check here also that is we are going to add new pic destroy old wali


            if(user.profilePic){

                // here destroy requires name of file like this will spli array into 8 parts by ehih we will get last part by pop and then that will be like x.png where x is name of file so that can be takne further on basis of dot splitting

                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);

            }

            // upload new one as already destroyed purani

            const uploadedResponse=await cloudinary.uploader.upload(profilePic); // this will return us an object and it will have a field called secure_url

            profilePic=uploadedResponse.secure_url;
        }

        user.name=name||user.name; // if user try to update name update it or if username empty keep it was as before
        user.email=email||user.email;
        user.username=username||user.username;
        user.profilePic=profilePic||user.profilePic;
        user.bio=bio||user.bio;

        user=await user.save();  // save user into db

        // IF WE UPDATE THE USER PROFILE AND THAT USER HAS COMMENTED ON SOME POSTS IT WILL NOT BE UPDATED THERE SO 
        // WE WILL TAKE ALL POSTS WHERE THIS USER REPLIED AND  do this with three objects filter,update and options(kuch nahi h rata marlo)

        await Post.updateMany(
            {"replies.userId":userId},  // filter (each reply that contain user id of current user)

            // update

            {
                $set:{
                    "replies.$[reply].username":user.username,
                    "replies.$[reply].userProfilePic":user.profilePic,

                }
            },

            // options (fill placeholders i.e reply)

            {
                arrayFilters:[{"reply.userId":userId}]
            }
        )

        // password should be null in response

        user.password=null;
        
        res.status(200).json({
            // message:"Profile updated successfully",
            user,
        })

    } 
    
    catch (err) {
        res.status(500).json({
            error:err.message,
        })

        console.error('Error in updateUser', err.message);
        console.log('req.body:', req.body);
    }
}

const getUserProfile=async(req,res)=>{

    const {query}=req.params;  // query is either gonna be username or user id

    // we will fetch user profile either with username or user id

    try {

        let user;

        // query is user id

        if(mongoose.Types.ObjectId.isValid(query)){
            user=await User.findOne({_id:query}).select("-password").select("-updatedAt");  // id is query and donot select password ot updatedAt
        }

        else{

            // query is username

            // select everythong except password and remove updated at field

            user=await User.findOne({username:query}).select("-password").select("-updatedAt");
        }

        if(!user){
            return res.status(400).json({
                error:"User not found"
            })
        }
       

        res.status(200).json(user);
    } 
    
    catch (err) {
        res.status(500).json({
            error:err.message,
        })

        console.error('Error in getting user profile', err.message);
        console.log('req.body:', req.body);
    }
}

export {signupUser,loginUser,logoutUser,followUnfollowUser,updateUser,getUserProfile};