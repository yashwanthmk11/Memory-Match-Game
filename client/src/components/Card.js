// Card.js
import React from 'react';
import './Card.css';

const Card = ({ card, isFlipped, isMatched, onClick }) => {
  const showEmoji = isFlipped || isMatched;

  return (
    <button
      className={`card ${showEmoji ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
      aria-label={showEmoji ? `Card: ${card.emoji}` : 'Hidden card'}
      tabIndex={0}
      role="button"
      disabled={isMatched}
      style={{
        touchAction: 'manipulation',
        outline: 'none',
        border: 'none',
        background: 'none',
        padding: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isMatched ? 'default' : 'pointer',
      }}
    >
      {showEmoji ? card.emoji : '❓'}
    </button>
  );
};

export default Card;
