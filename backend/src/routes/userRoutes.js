import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
  getUserList,
  deleteUser,
  findUser,
  getTotalPost,
  getFollowers,
  createNewUser,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// get all users
router.get("/list", getUserList);
router.post("/create", createNewUser)
router.get("/search/:id", findUser);
router.delete("/delete/:id", deleteUser);
// router.get("/posts/total/:username", protectRoute, getTotalPost);

// get total post of user
router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.get("/followers/:username", protectRoute, getFollowers)
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

export default router;
