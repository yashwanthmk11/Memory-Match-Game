// server/routes/points.js
const express = require('express');
const router = express.Router();
const Point = require('../models/Point');

// POST new point
router.post('/', async (req, res) => {
  try {
    const { player, moves, time } = req.body;
    const newPoint = new Point({ player, moves, time });
    await newPoint.save();
    res.status(201).json(newPoint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET top 10 scores
router.get('/', async (req, res) => {
  try {
    const topPoints = await Point.find().sort({ time: 1, moves: 1 }).limit(10);
    res.json(topPoints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
