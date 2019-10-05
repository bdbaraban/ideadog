import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { UserState } from 'store/user';

/**
 * Select user state from Redux store
 */
const useUserState = (): UserState => {
  return useSelector((state: AppState): UserState => state.user);
};

export default useUserState;
