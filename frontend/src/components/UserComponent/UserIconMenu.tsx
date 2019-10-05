import React, { createRef, FC } from 'react';

import Menu from '@material-ui/core/Menu';
import PersonIcon from '@material-ui/icons/Person';

import { ApplicationBarIconButton } from 'components/common';
import UserMenuItems from './UserMenuItems';

import { usePopover } from 'hooks';

/**
 * User icon that pops up account options menu, displayed on mobile
 */
const UserIconMenu: FC<{}> = () => {
  // Popover state
  const { anchorEl, handleClick, handleClose } = usePopover();

  // DOM reference for UserMenuItems
  const ref = createRef<HTMLUListElement>();

  return (
    <>
      <ApplicationBarIconButton onClick={handleClick}>
        <PersonIcon />
      </ApplicationBarIconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="account-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <UserMenuItems ref={ref} />
      </Menu>
    </>
  );
};

export default UserIconMenu;
