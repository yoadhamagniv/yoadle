import React, { useState, useEffect, useRef } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import words from './data/words.json';
import { normalizeHebrewLetter } from './utils/normalizeHebrewLetter';
import { isValidWord } from './utils/validateWord';
import './index.css';

// List of image filenames in public/imgs
const loveImages = [
  "WhatsApp Image 2025-05-29 at 21.47.18.jpeg",
  "WhatsApp Image 2025-05-29 at 21.47.20 (1).jpeg",
  "WhatsApp Image 2025-05-29 at 21.47.20.jpeg",
  "WhatsApp Image 2025-06-07 at 21.03.12.jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.05 (1).jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.05.jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.06 (5).jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.06 (4).jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.06 (3).jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.06 (2).jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.06 (1).jpeg",
  "WhatsApp Image 2025-06-08 at 20.24.06.jpeg",
  "WhatsApp Image 2025-06-10 at 11.44.22.jpeg",
  "WhatsApp Image 2025-06-10 at 23.34.22.jpeg",
  "WhatsApp Image 2025-06-22 at 13.17.42 (3).jpeg",
  "WhatsApp Image 2025-06-22 at 13.17.42 (2).jpeg",
  "WhatsApp Image 2025-06-22 at 13.17.42 (1).jpeg",
  "WhatsApp Image 2025-06-22 at 13.17.42.jpeg",
  "WhatsApp Image 2025-06-22 at 13.19.28 (1).jpeg",
  "WhatsApp Image 2025-06-22 at 13.19.28.jpeg",
  "WhatsApp Image 2025-06-22 at 13.19.29 (1).jpeg",
  "WhatsApp Image 2025-06-22 at 13.19.29.jpeg",
  "WhatsApp Image 2025-06-22 at 13.19.39.jpeg",
  "WhatsApp Image 2025-06-22 at 13.20.29.jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.39.jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (7).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (6).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (5).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (4).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (3).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (2).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40 (1).jpeg",
  "WhatsApp Image 2025-06-22 at 13.22.40.jpeg",
  "WhatsApp Image 2025-06-24 at 01.45.05.jpeg",
  "WhatsApp Image 2025-06-24 at 01.45.42.jpeg"
];

const getToday = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};
const getDailyWord = () => words[getToday()] || 'אהבה'; // Fallback word

const HEBREW_LETTERS = [
  'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ',
  'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך',
  'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', 'ף'
];

function getFeedback(guess, answer) {
  // Normalize both guess and answer for final letters
  const normGuess = guess.split('').map(normalizeHebrewLetter);
  const normAnswer = answer.split('').map(normalizeHebrewLetter);
  const feedback = Array(guess.length).fill('absent');
  const answerLetterCount = {};
  normAnswer.forEach(l => answerLetterCount[l] = (answerLetterCount[l] || 0) + 1);
  // First pass: correct
  for (let i = 0; i < normGuess.length; i++) {
    if (normGuess[i] === normAnswer[i]) {
      feedback[i] = 'correct';
      answerLetterCount[normGuess[i]]--;
    }
  }
  // Second pass: present
  for (let i = 0; i < normGuess.length; i++) {
    if (feedback[i] === 'correct') continue;
    if (answerLetterCount[normGuess[i]] > 0) {
      feedback[i] = 'present';
      answerLetterCount[normGuess[i]]--;
    }
  }
  return feedback;
}

function getInitialGuesses(wordLength) {
  return [];
}

function getInitialFeedbacks(wordLength) {
  return [];
}

function getInitialKeyboardStatuses() {
  const statuses = {};
  HEBREW_LETTERS.forEach(l => { statuses[l] = ''; });
  return statuses;
}

export default function App() {
  const [dailyWord, setDailyWord] = useState(getDailyWord());
  const [guesses, setGuesses] = useState(getInitialGuesses(dailyWord.length));
  const [feedbacks, setFeedbacks] = useState(getInitialFeedbacks(dailyWord.length));
  const [currentGuess, setCurrentGuess] = useState('');
  const [keyboardStatuses, setKeyboardStatuses] = useState(getInitialKeyboardStatuses());
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [error, setError] = useState('');
  const [animateRow, setAnimateRow] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const intervalRef = useRef();

  // Auto-update daily word
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const todayWord = getDailyWord();
      if (todayWord !== dailyWord) {
        setDailyWord(todayWord);
        setGuesses([]);
        setFeedbacks([]);
        setCurrentGuess('');
        setKeyboardStatuses(getInitialKeyboardStatuses());
        setGameState('playing');
        setError('');
      }
    }, 60000); // check every minute
    return () => clearInterval(intervalRef.current);
  }, [dailyWord]);

  // Update keyboard statuses
  useEffect(() => {
    const newStatuses = getInitialKeyboardStatuses();
    guesses.forEach((guess, i) => {
      const fb = feedbacks[i];
      guess.split('').forEach((letter, j) => {
        const status = fb[j];
        if (status === 'correct') newStatuses[letter] = 'correct';
        else if (status === 'present' && newStatuses[letter] !== 'correct') newStatuses[letter] = 'present';
        else if (status === 'absent' && !newStatuses[letter]) newStatuses[letter] = 'absent';
      });
    });
    setKeyboardStatuses(newStatuses);
  }, [guesses, feedbacks]);

  const handleKeyPress = (key) => {
    if (gameState !== 'playing') return;
    if (key === 'ENTER') {
      if (currentGuess.length !== dailyWord.length) {
        setError('אורך מילה לא נכון');
        return;
      }
      if (!isValidWord(currentGuess)) {
        setError('לא מילה בעברית');
        return;
      }
      const fb = getFeedback(currentGuess, dailyWord);
      const newGuesses = [...guesses, currentGuess];
      const newFeedbacks = [...feedbacks, fb];
      setGuesses(newGuesses);
      setFeedbacks(newFeedbacks);
      setAnimateRow(newGuesses.length - 1);
      setTimeout(() => setAnimateRow(-1), 700);
      setCurrentGuess('');
      setError('');
      if (currentGuess === dailyWord) {
        setGameState('won');
      } else if (newGuesses.length >= 6) {
        setGameState('lost');
      }
      return;
    }
    if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
      setError('');
      return;
    }
    if (currentGuess.length < dailyWord.length && HEBREW_LETTERS.includes(key)) {
      setCurrentGuess(currentGuess + key);
      setError('');
    }
  };

  // Keyboard event listener
  useEffect(() => {
    const handlePhysicalKey = (e) => {
      if (e.key === 'Enter') handleKeyPress('ENTER');
      else if (e.key === 'Backspace') handleKeyPress('BACKSPACE');
      else if (HEBREW_LETTERS.includes(e.key)) handleKeyPress(e.key);
    };
    window.addEventListener('keydown', handlePhysicalKey);
    return () => window.removeEventListener('keydown', handlePhysicalKey);
  }, [handleKeyPress]);

  const handleLoveNoteClick = () => {
    const idx = Math.floor(Math.random() * loveImages.length);
    setModalImg(`/imgs/${loveImages[idx]}`);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="yoadle-container">
      <h1>💕 יועדל - Yoadle 💕</h1>
      <div className="subtitle">נחשו את מילת האהבה של היום! 💖 ({dailyWord.length} אותיות)</div>
      <div className="love-note" onClick={handleLoveNoteClick} style={{cursor:'pointer'}} title="לחצו להפתעה!">💕 אני אוהב אותך ירדנה 💕</div>
      <Board
        guesses={guesses}
        feedbacks={feedbacks}
        wordLength={dailyWord.length}
        currentGuess={currentGuess}
        animateRow={animateRow}
      />
      <Keyboard onKeyPress={handleKeyPress} letterStatuses={keyboardStatuses} />
      {error && <div className="error-message">💔 {error} - אני אוהב אותך ירדנה 💕</div>}
      {gameState === 'won' && <div className="success-message">💕 כל הכבוד! אהבה מנצחת! אני אוהב אותך ירדנה! 💕</div>}
      {gameState === 'lost' && <div className="fail-message">💔 המילה הייתה: <b>{dailyWord}</b> - אבל אני עדיין אוהב אותך ירדנה! 💕</div>}
      {showModal && (
        <div className="modal-bg" onClick={closeModal}>
          <div className="modal-img-wrap" onClick={e => e.stopPropagation()}>
            <img src={modalImg} alt="love" className="modal-img" />
            <button className="modal-close" onClick={closeModal}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}
