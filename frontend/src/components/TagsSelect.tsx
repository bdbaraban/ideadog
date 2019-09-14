import React, { MouseEvent, ReactElement, useState } from 'react';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { TagsList } from 'components';

// TagsMenuList component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.common.white
    },
    menuListProps: {
      paddingBottom: 0,
      paddingTop: 0
    },
    paper: {
      color: theme.palette.common.white,
      width: '100%'
    },
    list: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1)
    }
  })
);

/**
 * Select component for choosing tag filters
 */
const TagsSelect = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

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
      <IconButton
        className={classes.icon}
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClickListItem}
      >
        <LocalOfferIcon fontSize="inherit" />
      </IconButton>
      <Menu
        classes={{
          paper: classes.paper
        }}
        MenuListProps={{ className: classes.menuListProps }}
        id="tags-filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuList className={classes.list}>
          <TagsList />
        </MenuList>
      </Menu>
    </>
  );
};

export default TagsSelect;
