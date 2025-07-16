import React, { useState, useEffect } from 'react';
import Card from './Card';
import Leaderboard from './Leaderboard';
import './GameBoard.css';
import confetti from 'canvas-confetti';

const flipSound = new Audio(process.env.PUBLIC_URL + "/sounds/flip.mp3");
const matchSound = new Audio(process.env.PUBLIC_URL + "/sounds/match.mp3");
const wrongSound = new Audio(process.env.PUBLIC_URL + "/sounds/wrong.mp3");
const winSound = new Audio(process.env.PUBLIC_URL + "/sounds/win.mp3");

const API_BASE = "http://localhost:5000"; // ✅ API base URL-

const cardValues = ['🍕', '🚀', '🐶', '🎮', '🌈', '🍩', '🎲', '🏀'];

const shuffleCards = () => {
  const cards = [...cardValues, ...cardValues]
    .map((emoji, index) => ({
      id: index + 1,
      emoji,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);

  useEffect(() => {
    setCards(shuffleCards());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

 const savePoint = async () => {
  const player = prompt("🎉 Enter your name for the leaderboard:");
  if (!player) return;

  try {
    const payload = { player, moves, time: timer };
    console.log("Sending Point:", payload); // ✅ log what we're sending

    const res = await fetch(`${API_BASE}/points`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log("Server response:", result);

    if (res.ok) {
      setRefreshLeaderboard(prev => !prev);
    } else {
      console.error("❌ Failed to save Point - Server error:", result);
    }
  } catch (err) {
    console.error("❌ Network error saving Point:", err);
  }
};


  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || cards[index].isMatched || flippedCards.includes(index)) return;

    flipSound.play();
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        const updated = [...cards];
        updated[first].isMatched = true;
        updated[second].isMatched = true;
        setCards(updated);
        matchSound.play();
        setFlippedCards([]);

        if (updated.every((card) => card.isMatched)) {
          setGameOver(true);
          winSound.play();
          confetti();
          savePoint();
        }
      } else {
        wrongSound.play();
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffleCards());
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    setFlippedCards([]);
  };

  return (
    <div className="main-layout">
      <div className="game-section">
        <h1>🧠 Memory Match Game</h1>
        <div className="info">
          <p>Moves: {moves}</p>
          <p>Time: {timer}s</p>
        </div>
        <div className="grid">
          {cards.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(i)}
              isMatched={card.isMatched}
              onClick={() => handleCardClick(i)}
            />
          ))}
        </div>
        {gameOver && <h2>🎉 You Won! Total Moves: {moves}</h2>}
        <button onClick={handleRestart}>Restart Game</button>
      </div>

      <div className="leaderboard-panel">
        <Leaderboard refreshTrigger={refreshLeaderboard} />
      </div>
    </div>
  );
};

export default GameBoard;
