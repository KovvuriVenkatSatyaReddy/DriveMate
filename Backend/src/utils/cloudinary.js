import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    // Use req.file.path instead of req.file.buffer for disk storage
    const stream = cloudinary.uploader.upload_stream(
      { folder: "resumes" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ success: false, message: "Upload failed" });
        }
        req.body.resumeLink = result.secure_url; // Attach the URL to the request
        next();
      }
    );

    // Pipe the file from disk to Cloudinary upload stream
    const fileStream = fs.createReadStream(req.file.path);
    fileStream.pipe(stream);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export { uploadToCloudinary };
