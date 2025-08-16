import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();

// seed an admin once (optional)
router.post("/seed-admin", async (req, res) => {
  const exists = await User.findOne({ email: "admin@demo.com" });
  if (exists) return res.json({ ok: true });
  const u = new User({
    name: "Admin",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin",
  });
  await u.save();
  res.json({ ok: true });
});

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ id: user._id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.compare(password)))
    return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );
  res.json({
    token,
    user: { id: user._id, name: user.name, role: user.role, email: user.email },
  });
});

export default router;
