import React from 'react';
import {
  createStyles,
  Icon,
  IconButton,
  makeStyles,
  Theme
} from '@material-ui/core';
import { LoginDialog } from '..';
import { Styles } from 'jss';
import { useNavigation } from 'react-navi';
import { UserSession } from '../../api';

/**
 * AccountButton component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      icon: {
        color: theme.palette.common.white,
        margin: theme.spacing(1),
        padding: theme.spacing(1)
      }
    })
);

/**
 * AccountButton component prop types
 */
interface AccountButtonProps {
  // Current user session
  user: UserSession;
}

/**
 * Account icon link component in top right of Navbar
 */
const AccountButton = ({ user }: AccountButtonProps): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();

  // Login dialog open status
  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  // User account icon navigation
  const handleClick = (): void => {
    if (user.current) {
      // Navigate to user page, if logged in
      navigation.navigate(`/user/${user.current.key}`);
    } else {
      // Otherwise, open login dialog
      toggleOpen();
    }
  };

  return (
    <div>
      <IconButton className={classes.icon} onClick={handleClick}>
        <Icon fontSize="large">account_circle</Icon>
      </IconButton>
      <LoginDialog open={open} toggleSelfOpen={toggleOpen} user={user} />
    </div>
  );
};

export default React.memo(AccountButton);
