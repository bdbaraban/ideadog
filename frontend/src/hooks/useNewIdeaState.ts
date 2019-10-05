import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { NewIdeaState } from 'store/newIdea';

/**
 * Select new idea state from Redux store
 */
const useNewIdeaState = (): NewIdeaState => {
  return useSelector((state: AppState): NewIdeaState => state.newIdea);
};

export default useNewIdeaState;
