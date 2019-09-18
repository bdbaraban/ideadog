// Filter object type
export interface SortFilter {
  key: string;
  icon: string;
}

// Reducer state
export interface SortState {
  all: SortFilter[];
  current: SortFilter;
}

// Action types
export const SET_SORT = 'store/sort/SET_SORT';

interface SetSort {
  type: typeof SET_SORT;
  payload: SortFilter;
}

export type SortActionTypes = SetSort;
