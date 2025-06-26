import React from 'react';
import './Keyboard.css';

const HEBREW_LETTERS = [
  'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ',
  'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך',
  'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', 'ף'
];

export default function Keyboard({ onKeyPress, letterStatuses }) {
  return (
    <div className="keyboard">
      {HEBREW_LETTERS.map((letter) => (
        <button
          key={letter}
          className={`key ${letterStatuses[letter] || ''}`}
          onClick={() => onKeyPress(letter)}
        >
          {letter}
        </button>
      ))}
      <button className="key special" onClick={() => onKeyPress('ENTER')}>⏎</button>
      <button className="key special" onClick={() => onKeyPress('BACKSPACE')}>⌫</button>
    </div>
  );
} 