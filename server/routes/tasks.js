import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE TASK (Delegation)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedBy: req.user.id,
      assignedTo,
      deadline,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET TASKS ASSIGNED TO USER
router.get("/my-tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id }).populate(
      "assignedBy",
      "name email"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE TASK STATUS
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET TASKS DELEGATED BY USER
router.get("/delegated", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.id }).populate(
      "assignedTo",
      "name email"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
