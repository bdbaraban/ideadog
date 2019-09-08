// Constant months codex
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
 * Format a date type like <month> <day>, <year>.
 * @param date {Date} - The date type to format.
 */
const formatDate = (date: Date): string => {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default formatDate;
