import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e6)}${path.extname(
        file.originalname
      )}`
    ),
});
const upload = multer({ storage });

const router = express.Router();
router.post("/audio", auth, upload.single("audio"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});
export default router;
