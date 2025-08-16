import { Router } from "express";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const router = Router();

// Admin: list doers
router.get("/doers", auth, requireRole("admin"), async (req, res) => {
  const doers = await User.find({ role: "user", active: true }).select(
    "-password"
  );
  res.json(doers);
});

// Admin: create doer
router.post("/doers", auth, requireRole("admin"), async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email exists" });
  const doer = await User.create({ name, email, password, role: "user" });
  res.json({ id: doer._id });
});

// Admin: deactivate doer
router.patch(
  "/doers/:id/deactivate",
  auth,
  requireRole("admin"),
  async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ ok: true });
  }
);

export default router;
