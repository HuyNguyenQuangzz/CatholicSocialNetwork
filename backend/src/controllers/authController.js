import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

// Register account
const registerUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate user data
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !username || !email || !password) {
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
        username: savedUser.username,
        phone: savedUser.phone,
        location: savedUser.location,
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

// Login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const isCheckEmail = reg.test(email);

    // if (!username || !password) {
    //   return res.status(200).json({
    //     status: "ERR",
    //     message: "The input is required",
    //   });

      // } else if (!isCheckEmail) {
      //   return res.status(200).json({
      //     status: "ERR",
      //     message: "The email must valid",
      //   });

    // }

    // use bcrypt to compare password input with password hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid username or password" }); // handle to Do not let someone know what wrong in(especial hacker)

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    generateTokenAndSetCookie(user._id, user.isAdmin, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      location: user.location,
      isAdmin: user.isAdmin,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Login User: ", error.message);
  }
};

// Logout
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res
      .status(200)
      .json({ status: "OK", message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logout: ", err.message);
  }
};

export { registerUser, loginUser, logoutUser };
