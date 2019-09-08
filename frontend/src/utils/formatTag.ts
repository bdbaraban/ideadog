/**
 * Split and capitalize a tag name.
 * @param tag {string} - The tag name to format.
 */
const formatTag = (tag: string): string => {
  return tag
    .split('_')
    .reduce(
      (formatted: string, word: string): string =>
        formatted + `${word[0].toUpperCase()}${word.substring(1)} `,
      ''
    )
    .trimEnd();
};

export default formatTag;
