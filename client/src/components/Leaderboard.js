import React, { useState, useEffect } from "react";
import './Leaderboard.css';
const Leaderboard = ({ refreshTrigger }) => {
  const [Point, setPoint] = useState([]);

useEffect(() => {
  fetch("https://memory-match-game-k5u3.onrender.com")
    .then(res => res.json())
    .then(data => setPoint(data))
    .catch(err => console.error("Failed to fetch points", err));
}, [refreshTrigger]);

 
  

  return (
    <div className="leaderboard">
      <h2>🏆 Top Players</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Moves</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Point.map((Point, i) => (
            <tr key={Point._id || i}>
              <td>{i + 1}</td>
              <td>{Point.player}</td>
              <td>{Point.moves}</td>
              <td>{Point.time}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
