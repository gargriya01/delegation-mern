import mongoose from "mongoose";
import Counter from "./Counter.js";

const timelineSchema = new mongoose.Schema({
  action: String, // created | completed | revised | viewed | updated
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  at: { type: Date, default: Date.now },
  note: String,
});

const taskSchema = new mongoose.Schema(
  {
    taskId: String, // e.g., TASK-0007
    description: { type: String, required: true },
    plannedTime: Date,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignerEmail: String,
    audioUrl: String,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Revised"],
      default: "Pending",
    },
    completedAt: Date,
    revisedAt: Date,
    timeline: [timelineSchema],
  },
  { timestamps: true }
);

taskSchema.pre("save", async function (next) {
  if (this.taskId) return next();
  const c = await Counter.findOneAndUpdate(
    { key: "task" },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );
  this.taskId = `TASK-${String(c.seq).padStart(4, "0")}`;
  next();
});

export default mongoose.model("Task", taskSchema);
