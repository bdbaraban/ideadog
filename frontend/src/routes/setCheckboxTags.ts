import { CheckboxTag, Tag } from '../types';

/**
 * Initialize an array of checkbox tags for tag-filtering components.
 * @param query {string | undefined} - String of currently-checked tags, comma-separated
 * @param allTags {Tag[]} - Array of all available tags.
 */
const setCheckboxTags = (
  query: string | undefined,
  allTags: Tag[]
): CheckboxTag[] => {
  // If no query tags, set all tag checkboxes to false
  if (query === undefined) {
    return allTags.map(
      (tag: Tag): CheckboxTag => {
        let obj: CheckboxTag = {};
        obj[`${tag.key[0].toUpperCase()}${tag.key.substring(1)}`] = {
          count: tag.count,
          checked: false
        };
        return obj;
      }
    );
  }

  // Otherwise, manually set tag checkboxes true/false based on query tags
  return allTags.map(
    (tag: Tag): CheckboxTag => {
      let obj: CheckboxTag = {};
      obj[`${tag.key[0].toUpperCase()}${tag.key.substring(1)}`] = {
        count: tag.count,
        checked: query.includes(tag.key)
      };
      return obj;
    }
  );
};

export default setCheckboxTags;
