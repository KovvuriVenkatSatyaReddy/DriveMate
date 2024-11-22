import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log(.....token);
  // console.log(req);


  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // console.log(user);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
};
export default authenticateUser;
export {verifyToken};