import React, { FC, MouseEvent, useState } from 'react';

import Hidden from '@material-ui/core/Hidden';

import TagsCard from './TagsCard';
import TagsSelectMenu from './TagsSelectMenu';

/**
 * Wraps select component for choosing tag filters
 */
const TagsSelectContainer: FC<{}> = () => {
  // Menu component anchor status
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open menu component anchored on selected sort filter
  const handleClickListItem = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu component
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Hidden xsDown implementation="css">
        <TagsCard />
      </Hidden>
      <Hidden smUp implementation="css">
        <TagsSelectMenu
          handleClickListItem={handleClickListItem}
          handleClose={handleClose}
          anchorEl={anchorEl}
        />
      </Hidden>
    </>
  );
};

export default TagsSelectContainer;
