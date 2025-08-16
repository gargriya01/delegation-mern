import express from "express";
import auth from "../middleware/auth.js";
import { adminOnly } from "../middleware/roles.js";
import Task from "../models/Task.js";
import { startOfDay, endOfDay, addDays } from "date-fns";

const router = express.Router();

// Admin create task (Step 4/5)
router.post("/", auth, adminOnly, async (req, res) => {
  const { description, plannedTime, assignee, audioUrl } = req.body;
  const t = new Task({
    description,
    plannedTime,
    assignee,
    audioUrl,
    assignerEmail: req.user.email,
    timeline: [{ action: "created", by: req.user.id }],
  });
  await t.save();
  res.status(201).json(t);
});

// Admin: all tasks (Step 6)
router.get("/", auth, adminOnly, async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const tasks = await Task.find(filter)
    .populate("assignee", "name email")
    .sort({ createdAt: -1 });
  res.json(tasks);
});

// User: my tasks list (Step 7 user-side)
router.get("/my", auth, async (req, res) => {
  const tasks = await Task.find({ assignee: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(tasks);
});

// Follow-up filters (today / next7 / all) (Step 7 top buttons)
router.get("/followup", auth, adminOnly, async (req, res) => {
  const { range } = req.query; // 'today' | 'next7' | 'all'
  let q = {};
  if (range === "today")
    q.plannedTime = {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    };
  if (range === "next7")
    q.plannedTime = {
      $gte: new Date(),
      $lte: endOfDay(addDays(new Date(), 7)),
    };
  const tasks = await Task.find(q).populate("assignee", "name email");
  res.json(tasks);
});

// Mark complete (Step 7 action)
router.put("/:id/complete", auth, async (req, res) => {
  const t = await Task.findByIdAndUpdate(
    req.params.id,
    {
      status: "Completed",
      completedAt: new Date(),
      $push: { timeline: { action: "completed", by: req.user.id } },
    },
    { new: true }
  );
  res.json(t);
});

// Add re-issue / revise (Step 7 action)
router.put("/:id/revise", auth, async (req, res) => {
  const t = await Task.findByIdAndUpdate(
    req.params.id,
    {
      status: "Revised",
      revisedAt: new Date(),
      $push: {
        timeline: { action: "revised", by: req.user.id, note: req.body.note },
      },
    },
    { new: true }
  );
  res.json(t);
});

export default router;
