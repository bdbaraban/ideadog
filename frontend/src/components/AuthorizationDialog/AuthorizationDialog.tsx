import React from 'react';
import { UserSession } from '../../api';
import { LoginDialog, SignUpDialog } from '.';

/**
 * AuthorizationDialog component prop types
 */
export interface AuthorizationDialogProps {
  // Current User session
  user: UserSession;
  // Open/closed status
  open: boolean;
  // Open/close toggler inherited from grandparent component
  toggleGrandparentOpen: VoidFunction | null;
  // Open/close toggler inherited from parent component
  toggleParentOpen: VoidFunction;
}

/**
 * Log in/sign up component
 */
const AuthorizationDialog = ({
  user,
  open,
  toggleGrandparentOpen,
  toggleParentOpen
}: AuthorizationDialogProps): React.ReactElement => {
  // Log in/sign up toggler booolean
  const [flipper, setFlipper] = React.useState<boolean>(false);

  // Authorization error message
  const [authError, setAuthError] = React.useState<string>('');

  // Close dialog
  const handleClose = (): void => {
    if (toggleGrandparentOpen) {
      toggleGrandparentOpen();
    }
    toggleParentOpen();
    setFlipper(false);
  };

  // Flip between login/signup screens
  const flip = (): void => {
    setFlipper(!flipper);
  };

  return !flipper ? (
    <LoginDialog
      open={open}
      user={user}
      handleClose={handleClose}
      flip={flip}
      authError={authError}
      setAuthError={setAuthError}
    />
  ) : (
    <SignUpDialog
      open={open}
      user={user}
      handleClose={handleClose}
      flip={flip}
      authError={authError}
      setAuthError={setAuthError}
    />
  );
};

export default React.memo(AuthorizationDialog);
