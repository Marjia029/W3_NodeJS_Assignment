import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store uploaded images in the 'public/images' folder
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    // Use timestamp and file extension to avoid filename collisions
    cb(null, Date.now() +path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// Create an Express router
const router = express.Router();

// POST route to upload images
router.post("/images", upload.single("image"), (req: Request, res: Response, next: NextFunction) => {
  // Check if a file was uploaded
  if (!req.file) {
    res.status(400).json({ error: "No image file uploaded." });
  }

  // Ensure that req.file exists and is not undefined
  const file = req.file;
  if (file) {
    // Send response after the image is uploaded successfully
    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl: `http://localhost:3000/images/${file.filename}`,  // Now using the 'file' variable
    });
  } else {
    res.status(400).json({ error: "Image upload failed." });
  }
});

// Serve the images statically from the 'public/images' directory
router.use("/images", express.static(path.join(__dirname, "../public/images")));

export default router;
