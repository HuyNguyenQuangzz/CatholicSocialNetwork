import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  sharePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
  getTotalPost,
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
router.put("/share/:id", protectRoute, sharePost);
router.get("/posts/total/:username", protectRoute, getTotalPost);

export default router;
