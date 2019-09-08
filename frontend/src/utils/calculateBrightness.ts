/**
 * Calculate brightness percentage (upvotes / (upvotes + downvotes)).
 * @param upvotes {number} - Number of upvotes.
 * @param downvotes {number} - Number of downvotes.
 */
const calculateBrightness = (
  upvotes: number | null,
  downvotes: number | null
): number => {
  if (!upvotes) {
    return 0;
  } else if (!downvotes) {
    return 100;
  }
  return Math.round(upvotes / (upvotes + downvotes));
};

export default calculateBrightness;
