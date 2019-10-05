import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { SortState } from 'store/sort';

/**
 * Select sort state from Redux store
 */
const useSortState = (): SortState => {
  return useSelector((state: AppState): SortState => state.sort);
};

export default useSortState;
