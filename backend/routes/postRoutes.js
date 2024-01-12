import express from "express";
import { createPost, deletePost, getPost, likeUnlikePost,replyToPost,getFeedPosts,getUserPosts} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router=express.Router();

router.get("/feed",protectRoute,getFeedPosts);  // protected as we don;t want anyone who deosn;t have account to see some posts or have homepage 

router.get("/:id",getPost);

router.get("/user/:username",getUserPosts);

router.post("/create",protectRoute,createPost);

router.delete("/:id",protectRoute,deletePost);

router.put("/like/:id",protectRoute,likeUnlikePost); // it should be prtected as if we don't have account or not logged in then we can't like/unlike a post

router.put("/reply/:id",protectRoute,replyToPost);

export default router;