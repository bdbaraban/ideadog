import React from 'react';
import { AuthorizationDialogProps, LoginDialog, SignUpDialog } from '.';

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
