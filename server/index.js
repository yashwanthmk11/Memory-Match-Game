import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Point from "./models/Point.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB error:", err);
});

// Routes
app.post("/points", async (req, res) => {
  try {
    const { player, moves, time } = req.body;
    const newPoint = new Point({ player, moves, time });
    await newPoint.save();
    res.status(201).json({ message: "Score saved" });
  } catch (err) {
    console.error("❌ Error saving score:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

app.get("/points", async (req, res) => {
  try {
    const leaderboard = await Point.find()
      .sort({ moves: 1, time: 1 }) // prioritize fewest moves, then fastest time
      .limit(5);
    res.json(leaderboard);
  } catch (err) {
    console.error("❌ Error fetching leaderboard:", err);
    res.status(500).json({ error: "Failed to fetch scores" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
