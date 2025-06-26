import React, { useState, useEffect } from 'react';

const WordleGame = () => {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const todaysWord = getTodaysWord();
    setWord(todaysWord);
  }, []);

  const handleGuess = () => {
    const newFeedback = guess.split('').map((letter, idx) => {
      if (word[idx] === letter) return 'correct';
      else if (word.includes(letter)) return 'present';
      return 'absent';
    });

    setFeedback(newFeedback);
  };

  const getTodaysWord = () => {
    const today = new Date().toLocaleDateString('he-IL');
    return words[today];
  };

  return (
    <div className="wordle-game">
      <h1>המילה של היום ({word.length} אותיות)</h1>
      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={word.length}
      />
      <button onClick={handleGuess}>נחש</button>

      <div className="feedback">
        {feedback.map((status, idx) => (
          <span key={idx} className={`letter ${status}`}>
            {guess[idx]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordleGame;
