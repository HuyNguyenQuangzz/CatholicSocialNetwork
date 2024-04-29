import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Additional checks
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    // selects all fields except(ngoại trừ) for the password field.

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in Signup User: ", err.message);
  }
};

export default protectRoute;

//  for:
//  Authentication: Xác thực
// Authorization: Ủy quyền
// Rate Limiting
