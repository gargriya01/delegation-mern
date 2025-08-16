import { Router } from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/roles.js";

const router = Router();

// Admin: create task
router.post("/", auth, requireRole("admin"), async (req, res) => {
  const { title, description, audioNoteUrl, dueAt, doer } = req.body;
  const task = await Task.create({
    title,
    description,
    audioNoteUrl,
    dueAt,
    assigner: req.user.id,
    doer,
    actions: [{ type: "created", by: req.user.id }],
  });
  res.json(task);
});

// Admin: list all (with filters)
router.get("/", auth, requireRole("admin"), async (req, res) => {
  const { status } = req.query;
  const q = {};
  if (status) q.status = status;
  const tasks = await Task.find(q)
    .populate("assigner", "name email")
    .populate("doer", "name email")
    .sort("-createdAt");
  res.json(tasks);
});

// User: my tasks
router.get("/mine", auth, async (req, res) => {
  const q = req.user.role === "admin" ? {} : { doer: req.user.id };
  const tasks = await Task.find(q)
    .populate("assigner", "name email")
    .populate("doer", "name email")
    .sort("-createdAt");
  res.json(tasks);
});

// User: complete task
router.post("/:id/complete", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });
  if (req.user.role !== "admin" && String(task.doer) !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });
  task.status = "completed";
  task.completedAt = new Date();
  task.actions.push({ type: "completed", by: req.user.id });
  await task.save();
  res.json(task);
});

// User: request revision
router.post("/:id/revise", auth, async (req, res) => {
  const { note } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Not found" });
  if (req.user.role !== "admin" && String(task.doer) !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });
  task.status = "revision_requested";
  task.actions.push({ type: "revised", by: req.user.id, note });
  await task.save();
  res.json(task);
});

export default router;
