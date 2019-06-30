import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  makeStyles,
  SvgIcon,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { SadTully } from '../../icons';
import { UserSession } from '../../api';
import { AuthorizationDialog } from '.';

/**
 * NotLoggedInDialog component style
 */
const useStyles = makeStyles(
  (): Styles =>
    createStyles({
      title: {
        textAlign: 'center',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        flex: '0 0 auto',
        margin: 0,
        padding: '24px 24px 8px 24px'
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16
      },
      button: {
        fontWeight: 'bold',
        marginTop: 16
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
  toggleParentOpen: VoidFunction;
}

/**
 * Dialog displayed when user tries to post without having logged in
 */
const NotLoggedInDialog = ({
  user,
  open,
  toggleParentOpen
}: NotLoggedInDialogProps): React.ReactElement => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return !isOpen ? (
    <Dialog
      onClose={toggleParentOpen}
      aria-labelledby="not-logged-in-dialog"
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <Typography
        className={classes.title}
        id="login-dialog-title"
        color="textSecondary"
        variant="h4"
      >
        You must be logged in
        <br />
        to post ideas.
      </Typography>
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
    </Dialog>
  ) : (
    <AuthorizationDialog
      open={open}
      toggleGrandparentOpen={toggleParentOpen}
      toggleParentOpen={toggleOpen}
      user={user}
    />
  );
};

export default React.memo(NotLoggedInDialog);
