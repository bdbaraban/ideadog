import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { IdeasState } from 'store/ideas';

/**
 * Select ideas state from Redux store
 */
const useIdeasState = (): IdeasState => {
  return useSelector((state: AppState): IdeasState => state.ideas);
};

export default useIdeasState;
