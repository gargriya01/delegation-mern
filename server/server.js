import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.get("/", (req, res) => res.send("Delegation API running"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(process.env.PORT, () =>
      console.log(`API on http://localhost:${process.env.PORT}`)
    );
  } catch (e) {
    console.error("DB connection failed", e);
    process.exit(1);
  }
};
start();
