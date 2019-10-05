import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  SyntheticEvent,
  useState
} from 'react';

// useSnackbar return type
interface SnackbarState {
  snackbarOpen: boolean;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  handleSnackbarClose: (
    _: SyntheticEvent | MouseEvent,
    reason?: string
  ) => void;
}

/**
 * Material-UI snackbar open state and event handlers
 */
const useSnackbar = (): SnackbarState => {
  // Snackbar open/closed status
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Close idea posted snackbar
  const handleSnackbarClose = (
    _: SyntheticEvent | MouseEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return { snackbarOpen, setSnackbarOpen, handleSnackbarClose };
};

export default useSnackbar;
