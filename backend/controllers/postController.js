import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import {v2 as cloudinary} from "cloudinary";

// create post

const createPost=async(req,res)=>{


    try {
        const {postedBy,text}=req.body;  // only required options are asked (img is optional, for more refrence see post model.js)

        let {img}=req.body;

        if(!postedBy || !text){
            return res.status(400).json({
                error:"PostedBy and text fileds are required",
            })
        }

        const user=await User.findById(postedBy);

        if(!user){
            return res.status(404).json({
                error:"User is not found",
            })
        }
        
        // check is user is creating post for his own not someone else

        // by default user._id is object

        if(user._id.toString()!==req.user._id.toString()){  // req.user is authenticated user which is trying to request
            console.log(user._id);  // user is the id of the user who wnat to post
            console.log(req.user._id);

            return res.status(401).json({
                error:"Unauthorized"
                
            })  

            ;
        }

        const maxLength=500;

        if(text.length>maxLength){
            return res.status(400).json({
                error:`Text must be less than ${maxLength} characters`
            })
        }

        if(img){
            const uploadedResponse=await cloudinary.uploader.upload(img); // this will return us an object and it will have a field called secure_url
            img=uploadedResponse.secure_url;
        }

        const newPost=new Post({
            postedBy,text,img
        })

        await newPost.save();

        res.status(200).json(
            
            newPost,
        )
    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })

        console.log(error);
    }
}

// get Post of ours i.e the user which is logged in

const getPost=async(req,res)=>{
    try {
        const {id}=req.params;

        const post=await Post.findById(id);

        if(!post){
            return res.status(404).json({
                error:"Post not found",
            })
        }

        // if successfull

        res.status(200).json(
            post,
        )
    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })

        console.log(error);
    }
}

// delete post

const deletePost=async(req,res)=>{
    try {
        
        const {id}=req.params;

        const post=await Post.findById(id);
        
        if(!post){
            return res.status(404).json({
                error:"Post not found"
            })
        }

        // check is user who want to delete post is owner of post

        // yarr jo user login hoga wohi delete krega na isliye we use req.user._id i.e we have to protect route as jb tak hum login hi nhi krenge tb tak kaise psot delte krenge

        if(post.postedBy.toString()!==req.user._id.toString()){
            return res.status(401).json({
                error:"Unauthorized to delete post",
            })
        }

        // delete from cloudinary if post has image 

        if(post.img){
            const imgId=post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            message:"Post deleted successfully"
        })
    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })

        console.log(error);
    }
}

const likeUnlikePost=async(req,res)=>{

    try {
        const {id:postId}=req.params;  // rename id as postId
        const userId=req.user._id;

        const post=await Post.findById(postId);

        if(!post){

            return res.status(404).json({
                message:"Post not found"
            })
        }

        // check if user has already liked or unliked a post or not

        const userLikedPost=post.likes.includes(userId);

        // if user already liked post we are going to remove it

        if(userLikedPost){

            // unlike post

            await Post.updateOne({_id:postId},{$pull:{likes:userId}}); // update the post where id is equal to post id and another object where we will remove userId from likes array

            res.status(200).json({
                message:"Post unliked successfully",
            })

        }

        else{

            // like post

            post.likes.push(userId);  // push user id into likes array
            await post.save();    // save the post to db

            res.status(200).json({
                message:"Post liked successfully"
            })
        }
    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })

        console.log(error);
    }
}

const replyToPost=async(req,res)=>{

    try {
        const {text}=req.body;
        const postId=req.params.id;

        const userId=req.user._id;

        const userProfilePic=req.user.profilePic;
        const username=req.user.username;

        // if no reply

        if(!text){
            return res.status(400).json({
                error:"text field is required"
            })
        }

        const post=await Post.findById(postId);

        if(!post){
            return res.status(404).json({
                error:"post not found"
            })
        }

        // create a reply object
// The extracted values are then used to create a new object named reply. 
// The syntax { userId, text, userProfilePic, username } is a shorthand in 
// JavaScript that creates an object with properties named after the variables and assigns the corresponding values.

        const reply={userId,text,userProfilePic,username};

        post.replies.push(reply);

        await post.save();

        res.status(200).json(
            
            reply
        )
    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })

        console.log(error);
    }
}

// posts by other users should show on our homepage which is know as feed

// eg: jane doe ki post h and john doe usko follow krta h then we will be able to see jane doe's post in our feed

const getFeedPosts=async(req,res)=>{
    try {
        const userId=req.user._id;
        const user=await User.findById(userId);

        if(!user){

            return res.status(404).json({
                error:"User not found",
            })
        }

        // get the list of user that current user follows
        const following=user.following;
        
        // find posts where postedBy field is in following array and we are sorting it on basis of creation time in descending order so that we can see latest post first 

        const feedPosts=await Post.find({postedBy:{$in:following}}).sort({createdAt:-1});

        // send it as feedPost not as object i.e {feedPost} which will make it array
        res.status(200).json(
            feedPosts,
        )

    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })

        console.log(error);
    }
}

const getUserPosts=async(req,res)=>{

    const {username}=req.params;

    try {
         
        const user=await User.findOne({username});

        if(!user){

            return res.status(404).json({
                error:"User not found"
            })
        }

        // find on the basis where postedBy field is equal to id of user and sort on basis of creation time i.e last posted will be first object in this array

        const posts=await Post.find({postedBy:user._id}).sort({createdAt:-1});

        res.status(200).json(posts);
    } 
    
    catch (error) {
        res.status(500).json({
            error:error.message,
        })
    }
}

export {createPost,getPost,deletePost,likeUnlikePost,replyToPost,getFeedPosts,getUserPosts};