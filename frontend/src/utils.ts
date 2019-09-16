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
 * Format a date type like <full month name> <day>, <year>.
 * @param date {Date} - The date type to format.
 */
export const formatLongDate = (date: Date): string => {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * Format a date type like <month number>/<day>/<year>.
 * @param date {Date} - The date type to format.
 */
export const formatShortDate = (date: Date): string => {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

/**
 * Split and capitalize a tag name.
 * @param tag {string} - The tag name to format.
 */
export const formatTag = (tag: string): string => {
  return tag
    .split(new RegExp('[_ ]', 'g'))
    .reduce(
      (formatted: string, word: string): string =>
        formatted + `${word[0].toUpperCase()}${word.substring(1)} `,
      ''
    )
    .trimEnd();
};
