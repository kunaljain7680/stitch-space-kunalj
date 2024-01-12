import mongoose from "mongoose";


// model is a blueprint which tells us which fields we are having inside schema

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    username:{
        type:String,
        required:true,
        unique:true,
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        minLength:6,
        required:true,
    },

    profilePic:{
        type:String,
        default:"",

    },

    // followers is an array os ids (string type)

    followers:{
        type:[String],
        default:[],
    },

    following:{
        type:[String],
        default:[],
    },

    bio:{
        type:String,
        default:"",
    }
},{
    timestamps:true,  // this object means timestamps true which adds created and updated fields( used to ad the feature of profile is created at)
})

const User=mongoose.model("User",userSchema);  // User should be in uppercase and singular and mongoose will create the users inside databse

export default User;