import React from 'react';
import {
  createStyles,
  Hidden,
  Icon,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
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

  // Menu component anchor status
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Close menu component
  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  // Open user profile page
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (user.current) {
      setAnchorEl(event.currentTarget);
    } else {
      // Otherwise, open login dialog
      toggleOpen();
    }
  };

  // Open user profile page
  const handleProfileClick = (): void => {
    if (user.current) {
      navigation.navigate(`/user/${user.current.key}`)
    }
  }

  // Log out user and refresh to home page
  const handleLogoutClick = (): void => {
    user.logout();
    navigation.navigate('/home');
  }

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
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="account-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick}>View Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
      </Menu>
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
