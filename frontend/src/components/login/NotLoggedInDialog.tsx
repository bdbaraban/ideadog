import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  SvgIcon,
  Theme
} from '@material-ui/core';
import { Styles } from 'jss';
import { SadTully } from '../../icons';
import { UserSession } from '../../api';
import { VoidFunction } from '../../types';
import { LoginDialog } from '.';

/**
 * NotLoggedInDialog component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      title: {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      button: {
        fontWeight: 'bold',
        marginTop: 8
      }
    })
);

/**
 * NotLoggedInDialog prop types
 */
interface NotLoggedInDialogProps {
  // Current user session
  user: UserSession;

  // Open/closed status
  open: boolean;

  // Open/close toggler inherited from parent component
  toggleSelfOpen: VoidFunction;
}

/**
 * Dialog displayed when user tries to post without having logged in
 */
const NotLoggedInDialog = ({
  open,
  toggleSelfOpen,
  user
}: NotLoggedInDialogProps): React.ReactElement => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return !isOpen ? (
    <Dialog
      onClose={toggleSelfOpen}
      aria-labelledby="not-logged-in-dialog"
      open={open}
    >
      <DialogTitle id="not-logged-in-dialog-title" className={classes.title}>
        You must be logged in to post ideas.
        <DialogContent className={classes.content}>
          <SvgIcon component={(): React.ReactElement => SadTully(92)}>
            &nbsp;
          </SvgIcon>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            onClick={toggleOpen}
          >
            Log In/Sign Up
          </Button>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  ) : (
    <LoginDialog open={open} toggleSelfOpen={toggleSelfOpen} user={user} />
  );
};

export default React.memo(NotLoggedInDialog);
