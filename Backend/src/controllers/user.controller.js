import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import e from "cors";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    // throw new ApiError(500,"Something went wrong while generating refresh and access tokens");
    return res.status(500).json({
      message:
        "Something went wrong while generating refresh and access tokens",
    });
  }
};

const registerUser = async (req, res) => {
  // Get user details from frontend
  const { name, email, password, rollNo } = req.body;
  console.log(name,email,password,rollNo);
  
  // Check for empty fields
  if ([name, email, password, rollNo].some((field) => field.toString().trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
  }


  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user object
    const newUser = await User.create({
      name,
      email,
      password,
      rollNo,
    });

    // Fetch the created user without sensitive fields
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    console.log(`Creating user: ${createdUser}`);

    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong while registering the user" });
    }

    console.log(`User created successfully: ${createdUser}`);
    return res.status(201).json({ message: "User registered successfully", user: createdUser });
  } catch (error) {
    // Return error response
    console.error("Error registering user:", error); // Log the error
    return res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(400)
      .json({ message: "Emial and password is required" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login successful",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json("User logged out");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Problem logging out user", error: error.message });
  }
};

// user.controller.js
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Unauthorized request: no token provided" });
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);

    if (!user || incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({ message: "Invalid or expired refresh token" });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Update refresh token in database
    user.refreshToken = newRefreshToken;
    await user.save();

    // Set cookies with secure options
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };
    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json({ accessToken, refreshToken: newRefreshToken, message: "Access token refreshed" });
  } catch (error) {
    return res.status(401).json({ message: "Error refreshing token", error: error.message });
  }
};

const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrext = await user.isPasswordCorrext(oldPassword);

  if (!isPasswordCorrext) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave });

  return res.status(200).json("Password changed succesfully");
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    user: req.user,
    message: "current user fetched successfully",
  });
};

const getAllUsers = async (req, res) => {
  try {
      // Fetch users with only the specified fields
      const users = await User.find({}, 'name email role isPlaced isBanned');

      // Categorize users based on their role and banned status
      const categorizedUsers = {
        admins: [],
        coordinators: [],
        students: [],
        bannedStudents: []
      };

      users.forEach(user => {
          if (user.role === 'admin') {
              categorizedUsers.admins.push(user);
          } else if (user.role === 'coordinator') {
              categorizedUsers.coordinators.push(user);
          } else if (user.role === 'student') {
              if (user.isBanned) {
                  categorizedUsers.bannedStudents.push(user);
              } else {
                  categorizedUsers.students.push(user);
              }
          }
      });

      // Send the response with categorized users
      res.status(200).json({
          users: categorizedUsers,
          message: "User details fetched successfully"
      });
  } catch (error) {
      res.status(500).json({
          message: "Error fetching user details",
          error: error.message
      });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
      const currentUserRole = req.user?.role;
      console.log(currentUserRole);
      
      // Check if the current user has "admin" or "coordinator" role
      if (currentUserRole !== "admin" && currentUserRole !== "coordinator") {
          return res.status(403).json({
              message: "Access denied. You do not have permission to view this user's details."
          });
      }

      // Get the userId from request parameters
      const  {id}  = req.params;
      // console.log(userId);
      
      // Fetch the specific user's details
      const user = await User.findById(id).select("-password"); // Exclude sensitive fields like password

      // If the user is not found, return a 404 response
      if (!user) {
          return res.status(404).json({
              message: "User not found"
          });
      }

      // Send the user details in the response
      res.status(200).json({
          user,
          message: "User details fetched successfully"
      });
  } catch (error) {
      res.status(500).json({
          message: "Error fetching user details",
          error: error.message
      });
  }
};

const updateUserProfile = async (req, res) => {
  // console.log(req.user._id);
  const userId = req.user?._id;
  // console.log(userId);
  
  const {
    name,
    email,
    personalEmail,
    phoneNumber,
    degree,
    branch,
    gender,
    tenthPercentage,
    twelfthPercentage,
    currentCGPA,
    resumeLink,
    placedIn,
  } = req.body;

  try {
    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        personalEmail,
        phoneNumber,
        degree,
        branch,
        gender,
        tenthPercentage,
        twelfthPercentage,
        currentCGPA,
        resumeLink,
        placedIn,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message,
    });
  }
};

const promoteUser = async (req, res) => {
  const userId = req.body._id; // Ensure user is authenticated and has an ID
  console.log(userId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "coordinator" },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User promoted to coordinator",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error promoting user",
      error: error.message,
    });
  }
};


const demoteUser = async (req,res) => {
  const userId = req.body._id;
  // console.log(userId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "student" },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User demoted to student",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error demoting user",
      error: error.message,
    });
  }
}

const banUser = async (req,res) => {
  const userId = req.body._id;
  // console.log(userId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isBanned: "true" ,role: "student",},
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User successfully banned",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error banning user",
      error: error.message,
    });
  }
}

const unBanUser = async (req,res) => {
  const userId = req.body._id;
  // console.log(userId);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        isBanned: "false",
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User successfully un banned",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error unbanning user",
      error: error.message,
    });
  }
}

export {
  registerUser,
  loginUser,
  updateUserProfile,
  promoteUser,
  demoteUser,
  banUser,
  unBanUser,
  logoutUser,
  generateAccessAndRefreshTokens,
  getAllUsers,
  getUserDetails,
  changeCurrentPassword,
  getCurrentUser,
  refreshAccessToken,
  getUserInfo,
};
