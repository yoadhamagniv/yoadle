// Utility to normalize Hebrew final letters to their standard forms
export const normalizeHebrewLetter = letter => {
  const map = {'ך':'כ', 'ם':'מ', 'ן':'נ', 'ף':'פ', 'ץ':'צ'};
  return map[letter] || letter;
}; 