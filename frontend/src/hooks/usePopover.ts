import { MouseEvent, useState } from 'react';

// usePopover return type
export interface PopoverState {
  anchorEl: null | HTMLElement;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
  handleClose: VoidFunction;
}

/**
 * Material-UI popover anchor state and event handlers
 */
const usePopover = (): PopoverState => {
  // Popover anchoring
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open popover menu
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close popover menu
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return { anchorEl, handleClick, handleClose };
};

export default usePopover;
