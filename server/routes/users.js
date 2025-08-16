import express from "express";
import auth from "../middleware/auth.js";
import { adminOnly } from "../middleware/roles.js";
import User from "../models/User.js";

const router = express.Router();

// list doers (no password)
router.get("/", auth, adminOnly, async (_req, res) => {
  const users = await User.find({}, "-password").sort({ createdAt: -1 });
  res.json(users);
});

// add doer
router.post("/", auth, adminOnly, async (req, res) => {
  const { name, email } = req.body;
  const tempPwd = "welcome123";
  const user = new User({ name, email, role: "user", password: tempPwd });
  await user.save();
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
});

// edit doer
router.put("/:id", auth, adminOnly, async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true, select: "-password" }
  );
  res.json(user);
});

// delete doer
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
