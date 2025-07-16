// Card.js
import React from 'react';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, onClick }) => {
  const showEmoji = isFlipped || isMatched;

  return (
    <div
      className={`card ${showEmoji ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      {showEmoji ? card.emoji : '❓'}
    </div>
  );
};

export default Card;
