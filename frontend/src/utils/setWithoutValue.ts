/**
 * Return a clone of a given set without a given value.
 * @param set {Set} - The set to clone.
 * @param value {string} - The value to exclude from the clone.
 */
const setWithoutValue = (set: Set<string>, value: string): Set<string> => {
  set.delete(value);
  return new Set(set);
};

export default setWithoutValue;
