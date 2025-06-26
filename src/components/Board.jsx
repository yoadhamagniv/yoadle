import React from 'react';
import Tile from './Tile';
import './Board.css';

export default function Board({ guesses, feedbacks, wordLength, currentGuess, animateRow }) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const guess = guesses[i] || '';
    const feedback = feedbacks[i] || [];
    const isCurrentRow = i === guesses.length;
    
    rows.push(
      <div className="board-row" key={i}>
        {[...Array(wordLength)].map((_, j) => {
          let letter = '';
          let status = '';
          let animate = false;
          
          if (i < guesses.length) {
            // Completed row
            letter = guess[j] || '';
            status = feedback[j] || '';
            animate = i === animateRow;
          } else if (isCurrentRow) {
            // Current typing row
            letter = currentGuess[j] || '';
            status = '';
            animate = false;
          }
          // Future rows remain empty
          
          return (
            <Tile
              key={j}
              letter={letter}
              status={status}
              animate={animate}
            />
          );
        })}
      </div>
    );
  }
  return <div className="board">{rows}</div>;
} 