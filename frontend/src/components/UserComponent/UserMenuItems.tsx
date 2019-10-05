import React, { FC, forwardRef, Ref } from 'react';
import { useRouter } from 'next/router';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { useUserState } from 'hooks';

// UserMenuItems component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    white: {
      color: theme.palette.common.white
    }
  })
);

/**
 * User menu options to view account or log out
 */
const UserMenuItems: FC<{}> = (_, ref: Ref<HTMLUListElement>) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select Next router
  const router = useRouter();

  // Select logged in user
  const user = useUserState();

  // Redirect to user profile page
  const handleViewProfileClick = (): void => {
    router.push(`/user/${user.profile.key}`);
  };

  // Log out user and refresh to home page
  const handleLogoutClick = (): void => {
    router.push('/logout');
  };

  return (
    <MenuList ref={ref}>
      <MenuItem className={classes.white} onClick={handleViewProfileClick}>
        View Profile
      </MenuItem>
      <MenuItem className={classes.white} onClick={handleLogoutClick}>
        Log Out
      </MenuItem>
    </MenuList>
  );
};

export default forwardRef(UserMenuItems);
