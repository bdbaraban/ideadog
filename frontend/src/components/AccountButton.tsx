import React, { MouseEvent, ReactElement, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

// AccountButton component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    white: {
      color: theme.palette.common.white
    }
  })
);

/**
 * Account icon link component in top right of Navbar
 */
const AccountButton = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Menu component anchor status
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Close menu component
  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  // Open user profile page
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton className={classes.white} onClick={handleClick}>
        <PersonIcon />
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
        <MenuItem className={classes.white}>View Profile</MenuItem>
        <MenuItem className={classes.white}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default AccountButton;
