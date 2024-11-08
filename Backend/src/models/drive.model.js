import mongoose, { Schema } from "mongoose";
import slugify from "slugify"
const DriveSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    ctc: {
      type: Number, // CTC offered by the company (in LPA)
      required: true,
    },
    eligibleBranches: {
      type: [String], // Array of eligible branches
      enum: ["CS", "IT", "ECE", "EE", "ME", "CE", "PIE"],
      required: true,
    },
    minCGPA: {
      type: Number,
      required: true, // Minimum CGPA requirement
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "All"], // Can have specific gender criteria or "All"
      required: true,
    },
    selectionProcess: {
      type: String, // Description of the selection process
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "ongoing", "completed"], // Status of the drive
      required: true,
    },
    relatedDocuments: [
      {
        url: { type: String }, // URLs to related documents (like job details, company profile, etc.)
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    instructions: {
      type: String, // Any specific instructions for the candidates
      // required: true,
    },
    appliedUsers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        applicationDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Applied", "Under Review", "Accepted", "Rejected"],
          default: "Applied",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming an Admin/User model exists
    },
    updates: [
      {
        content: {
          type: String,
          required: true, // The actual update content (e.g., "Seating arrangements have been announced")
        },
        timestamp: {
          type: Date,
          default: Date.now, // Automatically sets the current date and time when an update is added
        },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Refers to the user who posted the update
        },
        file: {
          type: String, // This field will store the URL or file path of the uploaded file
        },
        fileDescription: {
          type: String, // Optional: A description of the uploaded file (e.g., "Seating arrangement PDF")
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

DriveSchema.pre("save", function (next) {
  if (!this.isModified("companyName") && !this.isModified("role")) {
    return next();
  }
  this.slug = slugify(`${this.companyName}-${this.role}`, { lower: true });
  next();
});

export const Drive = mongoose.model("Drive", DriveSchema);