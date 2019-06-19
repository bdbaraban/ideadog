import React from 'react';
import {
  createStyles,
  Hidden,
  Icon,
  IconButton,
  makeStyles,
  Theme
} from '@material-ui/core';
import { AuthorizationDialog } from '..';
import { Styles } from 'jss';
import { useNavigation } from 'react-navi';
import { UserSession } from '../../api';

/**
 * AccountButton component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        [theme.breakpoints.up('sm')]: {
          marginLeft: 4,
          marginRight: 4
        }
      },
      icon: {
        color: theme.palette.common.white
      },
      responsive: {
        fontSize: '2rem'
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
    <div className={classes.root}>
      <IconButton className={classes.icon} onClick={handleClick}>
        <Hidden xsDown>
          <Icon fontSize="large">account_circle</Icon>
        </Hidden>
        <Hidden smUp>
          <Icon classes={{ root: classes.responsive }}>account_circle</Icon>
        </Hidden>
      </IconButton>
      <AuthorizationDialog
        user={user}
        open={open}
        toggleGrandparentOpen={null}
        toggleParentOpen={toggleOpen}
      />
    </div>
  );
};

export default React.memo(AccountButton);
