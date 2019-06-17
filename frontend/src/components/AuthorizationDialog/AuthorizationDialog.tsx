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

  const handleClose = (): void => {
    if (toggleGrandparentOpen) {
      toggleGrandparentOpen();
    }
    toggleParentOpen();
    setFlipper(false);
  };

  const flip = (): void => {
    setFlipper(!flipper);
  };

  return !flipper ? (
    <LoginDialog
      open={open}
      user={user}
      handleClose={handleClose}
      flip={flip}
    />
  ) : (
    <SignUpDialog
      open={open}
      user={user}
      handleClose={handleClose}
      flip={flip}
    />
  );
};

export default React.memo(AuthorizationDialog);
