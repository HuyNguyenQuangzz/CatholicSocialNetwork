import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

// Get a list of users(all users)
// const getUserList = async (req, res) => {
//   try {
//     const user = await User.find();
//     res.status(200).json({ user: user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const createNewUser = async (req, res) => {
  try {
    const { name, email,gender,dob,bio,address,phone, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate user data
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !username || !email || !gender || !dob || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "Email must valid",
      });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\W/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
      });
    }

    if (existingUser) {
      // 400 Bad Request
      return res
        .status(400)
        .json({ error: "User already exists, Please try again!" });
    }

    // create a new account and save it to the database
    const newUser = new User({
      name,
      email,
      gender,
      dob,
      phone,
      address,
      bio,
      username,
      password: hashedPassword,
    });
    // Save new user to database
    const savedUser = await newUser.save();

    // Generate token and set cookie
    if (savedUser) {
      generateTokenAndSetCookie(savedUser._id, savedUser.isAdmin, res);

      // Return new user data
      return res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        gender: savedUser.gender,
        dob: savedUser.dob,
        username: savedUser.username,
        phone: savedUser.phone,
        address: savedUser.address,
        isAdmin: savedUser.isAdmin,
        bio: savedUser.bio,
        profilePic: savedUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
      // 400 Bad Request
    }
  } catch (err) {
    // 500 Internal Server Error
    res.status(500).json({ error: err.message });
    console.log("Error in register user: ", err.message);
  }
};



// for user profile
const updateUser = async (req, res) => {
  const { name, email, username, password, gender, dob, address, phone, bio } =
    req.body;
  let { profilePic } = req.body;

  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.bio = bio || user.bio;

    user = await user.save();

    // Find all posts that this user replied and update username and userProfilePic fields
    await Post.updateMany(
      { "replies.userId": userId },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        },
      },
      { arrayFilters: [{ "reply.userId": userId }] }
    );

    // password should be null in response
    user.password = null;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};
// for admin
const updateUserForAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    res.status(200).json("Delete user successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// STOP HERE
// Search user
const findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    // res.status(500).json("User Not Found");
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  // We will fetch user profile either with username or userId
  // query is either username or userId
  const { query } = req.params;

  try {
    let user;

    // query is userId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      // query is username
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    // exclude the current user from suggested users array and exclude users that current user is already following
    const userId = req.user._id;

    const usersFollowedByYou = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 5);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const freezeAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.isFrozen = true;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const totalPost = await Post.countDocuments({ postedBy: userId });
    res.status(200).json({ totalPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFollowers = async (req, res) => {
  try {
    const userId = req.user._id;
    const followers = await User.find({ following: userId });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get all user for admin manager

export {
  createNewUser,
  updateUserForAdmin,
  getUserList,
  followUnFollowUser,
  updateUser,
  deleteUser,
  getTotalPost,
  findUser,
  getUserProfile,
  getSuggestedUsers,
  freezeAccount,
  getFollowers,
};
