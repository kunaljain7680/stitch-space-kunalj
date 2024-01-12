import mongoose from "mongoose";

const postSchema=mongoose.Schema({

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,  // id will be auto genrated by mongoose
        ref:"User",                       // ref will be the User model and object id will be from users model
        required:true,
    },

    text:{
        type:String,
        maxLength:500
    },

    img:{
        type:String,
    },

    likes:{

        // array of user ids
        
        // we should made it array of user ids who liked this post and in order to count likes use arr.length
        
        type:[mongoose.Schema.Types.ObjectId],
        res:"User",
        default:[], // default is an empty array
    },

    // replies will be an array of something and each reply will be an object

    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
            },

            text:{
                type:String,
                required:true,
            },

            userProfilePic:{
                type:String,

            },

            username:{
                type:String,
            }

        }
    ]
},{
    timestamps:true
})

const Post=mongoose.model("Post",postSchema);

export default Post;