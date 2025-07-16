import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true,
  },
  moves: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("Point", pointSchema);
