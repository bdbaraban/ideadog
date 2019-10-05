import { useSelector } from 'react-redux';
import { AppState } from 'store';

/**
 * Select entire app state from Redux store
 */
const useAppState = (): AppState => {
  return useSelector((state: AppState): AppState => state);
};

export default useAppState;
