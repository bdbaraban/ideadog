import React, { FC, MouseEvent, ReactNode } from 'react';

import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Menu from '@material-ui/core/Menu';

import { ApplicationBarIconButton } from 'components/common';

// SelectIconButton component prop types
interface SelectIconButtonProps {
  handleOpen: (event: MouseEvent<HTMLElement>) => void;
  handleClose: VoidFunction;
  anchorEl: null | HTMLElement;
  icon: string;
  children: ReactNode;
}

/**
 * Icon button with sort select popup mennu, displayed on mobile
 */
const SelectIconButton: FC<SelectIconButtonProps> = ({
  handleOpen,
  handleClose,
  icon,
  anchorEl,
  children
}: SelectIconButtonProps) => {
  return (
    <FormControl>
      <ApplicationBarIconButton onClick={handleOpen}>
        <Icon>{icon}</Icon>
      </ApplicationBarIconButton>
      <Menu
        id="sort-filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </FormControl>
  );
};

export default SelectIconButton;
