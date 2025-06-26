import React from 'react';
import './Tile.css';

export default function Tile({ letter, status, animate }) {
  return (
    <div className={`tile ${status || ''} ${animate ? 'flip' : ''}`}>
      {letter}
    </div>
  );
} 