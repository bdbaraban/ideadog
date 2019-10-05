import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { TagsState } from 'store/tags';

/**
 * Select tags state from Redux store
 */
const useTagsState = (): TagsState => {
  return useSelector((state: AppState): TagsState => state.tags);
};

export default useTagsState;
