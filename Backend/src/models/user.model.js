import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "coordinator"], // Defines the allowed roles
        default: "student", // Sets the default role as 'student'
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Helps in faster querying
      trim: true,
    },
    personalEmail: {
      type: String,
      // required: true,
      unique: true,
      sparse: true,
      trim: true,
    },
    degree: {
      type: String,
      // required: true,
      trim: true,
    },
    branch: {
      type: String,
      // required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
      trim: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"], // Restrict to these values
        // required: true,
    },
    photo: {
        type: String, // URL of the user's photo (could be stored on cloud storage like Cloudinary, S3)
        // required: false, // Optional field, can be added later
    },
    branch: {
        type: String,
        // required: true,
        trim: true,
    },
    rollNo: {
      type: String,
      // required: true,
      // unique: true, // Each roll number should be unique
      index: true,
      trim: true,
    },
    tenthPercentage: {
        type: Number,
        // required: true,
        trim: true,
    },
    twelfthPercentage: {
        type: Number,
        // required: true,
        trim: true,
    },
    currentCGPA: {
      type: Number,
      // required: true,
    },
    resumes: [
      {
        url: { type: String, required: true }, // Resume storage link (Cloudinary, S3, etc.)
        uploadedAt: { type: Date, default: Date.now }, // Upload date
      },
    ],
    address: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    isPlaced: {
      type: Boolean,
      default: false, // Track if the user is placed
    },
    placedIn: {
      type: String, // Name of the company where the user is placed
      // required: false, // Not required initially, will be updated once placed
    },
    isBanned: {
      type: Boolean,
      default: false, // Track if the user is banned
    },
    appliedDrives: [
      {
        driveId: { 
            type: mongoose.Schema.Types.ObjectId, ref: "Drive" 
        }, // Reference to the Drive model
        appliedAt: { type: Date, default: Date.now }, // Date the user applied for the drive
      },
    ],
    password: {
        type: String,
        required:[true,'Password is required'],
    },
    refreshToken: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function (next) {
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            name:this.name,
            role:this.role,
            rollNo:this.rollNo,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
          },
        )
      }
      
      userSchema.methods.generateRefreshToken = function () {
        return jwt.sign(
          {
            _id: this._id,
            email:this.email,
            name:this.name,
            role:this.role,
            rollNo:this.rollNo,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        },
    )
}


export const User = mongoose.model("User", userSchema);