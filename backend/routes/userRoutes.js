import express from "express";
import { signupUser,loginUser,logoutUser,followUnfollowUser,updateUser,getUserProfile} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router=express.Router();

router.get("/profile/:query",getUserProfile);
router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);   // it will remove cookie
router.post("/follow/:id",protectRoute,followUnfollowUser);  // protectRoute is a function (i.e middleware) that i cannot follow/unfollow untill i am logged in 
router.put("/update/:id",protectRoute,updateUser);
export default router;