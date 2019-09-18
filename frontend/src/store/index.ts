import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  DeepPartial,
  Store
} from 'redux';
import { useDispatch } from 'react-redux';
import thunk, {
  ThunkAction,
  ThunkDispatch,
  ThunkMiddleware
} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import ideasReducer, {
  IdeasActionTypes,
  IdeasState,
  initialIdeasState
} from 'store/ideas';
import newIdeaReducer, {
  initialNewIdeaState,
  NewIdeaActionTypes,
  NewIdeaState
} from 'store/newIdea';
import searchReducer, {
  initialSearchState,
  SearchActionTypes,
  SearchState
} from 'store/search';
import sortReducer, {
  initialSortState,
  SortActionTypes,
  SortState
} from 'store/sort';
import tagsReducer, {
  initialTagsState,
  TagsActionTypes,
  TagsState
} from 'store/tags';
import userReducer, {
  initialUserState,
  UserActionTypes,
  UserState
} from 'store/user';

// Configure default Redux state
const defaultState: DeepPartial<{
  ideas: IdeasState;
  newIdea: NewIdeaState;
  search: SearchState;
  sort: SortState;
  tags: TagsState;
  user: UserState;
}> = {
  ideas: initialIdeasState,
  newIdea: initialNewIdeaState,
  search: initialSearchState,
  sort: initialSortState,
  tags: initialTagsState,
  user: initialUserState
};

// Combine all reducers
const rootReducer = combineReducers({
  ideas: ideasReducer,
  newIdea: newIdeaReducer,
  search: searchReducer,
  sort: sortReducer,
  tags: tagsReducer,
  user: userReducer
});

// Store state type
export type AppState = ReturnType<typeof rootReducer>;

// Action types
export type AppActions = IdeasActionTypes &
  NewIdeaActionTypes &
  SearchActionTypes &
  SortActionTypes &
  TagsActionTypes &
  UserActionTypes;

// Redux Thunk action type
export type ActionType = ThunkAction<void, AppState, null, Action<string>>;

// Redux Thunk dispatch type
type DispatchType = ThunkDispatch<AppState, null, Action<string>>;

// Redux Thunk custom useDispatch hook
export const useThunkDispatch = (): DispatchType => useDispatch<DispatchType>();

// Redux store type
export type AppStore = Store<AppState, Action<string>> & {
  dispatch: DispatchType;
};

/**
 * Instantiate the Redux store.
 * @param initialState - Default Redux state.
 */
export const initializeStore = (initialState = defaultState): AppStore => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
    )
  );
};
