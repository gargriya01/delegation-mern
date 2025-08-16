import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["created", "completed", "revised"],
      required: true,
    },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    note: String,
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    audioNoteUrl: String,
    dueAt: Date,
    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "revision_requested"],
      default: "pending",
    },
    completedAt: Date,
    actions: [actionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
