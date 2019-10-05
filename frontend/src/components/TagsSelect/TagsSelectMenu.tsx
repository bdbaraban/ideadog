import React, { FC, MouseEvent } from 'react';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import { ApplicationBarIconButton } from 'components/common';
import TagsList from './TagsList';

// TagsSelectMenu component style
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

// TagsSelectMenu component prop types
interface TagsSelectMenuProps {
  handleClickListItem: (event: MouseEvent<HTMLElement>) => void;
  handleClose: VoidFunction;
  anchorEl: null | HTMLElement;
}

/**
 * Menu to select tag filters
 */
const TagsSelectMenu: FC<TagsSelectMenuProps> = ({
  handleClickListItem,
  handleClose,
  anchorEl
}: TagsSelectMenuProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <>
      <ApplicationBarIconButton
        aria-controls="tags-select-menu"
        onClick={handleClickListItem}
      >
        <LocalOfferIcon fontSize="inherit" />
      </ApplicationBarIconButton>
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

export default TagsSelectMenu;
