import React, { FC } from 'react';

import Hidden from '@material-ui/core/Hidden';

import UserIconMenu from './UserIconMenu';
import ApplicationBarUserCard from 'components/ApplicationBarUserCard';

/**
 * Wraps info and account actions for logged in user, displayed in ApplicationBar
 */
const UserComponentContainer: FC<{}> = () => {
  return (
    <>
      {/* User info card, displayed on desktop */}
      <Hidden xsDown implementation="css">
        <ApplicationBarUserCard />
      </Hidden>

      {/* Button with popup menu to access account, displayed on mobile */}
      <Hidden smUp implementation="css">
        <UserIconMenu />
      </Hidden>
    </>
  );
};

export default UserComponentContainer;
