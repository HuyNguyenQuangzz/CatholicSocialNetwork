import express from "express";
import {
  followUnFollowUser,
  getUserProfile,
  // loginUser,
  // logoutUser,
  // signupUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
  getUserList,
  deleteUser,
  findUser,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// get all users
router.get("/list", getUserList);
router.get("/search/:id", findUser);
router.delete("/delete/:id", deleteUser);

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
// authentication
// router.post("/signup", signupUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);

export default router;
