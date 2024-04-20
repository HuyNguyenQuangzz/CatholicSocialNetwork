import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, isAdmin, res) => {
  const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
// const generateTokenAndSetCookie = (userId, res) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // more secure, this cookie can not be accessed by the browser
    // Set expiration time for JWT tokens (e.g., '1h' for 1 hour)
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict", // CSRF
  });

  return token;
};

export default generateTokenAndSetCookie;
