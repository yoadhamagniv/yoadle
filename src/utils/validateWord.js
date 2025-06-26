import validWords from '../data/valid_words.json';
import { normalizeHebrewLetter } from './normalizeHebrewLetter';

export function normalizeHebrewWord(word) {
  return word.split('').map(normalizeHebrewLetter).join('');
}

export function isValidWord(word) {
  const normalized = normalizeHebrewWord(word);
  return validWords.some(w => normalizeHebrewWord(w) === normalized);
} 