import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  ReactElement,
  useState
} from 'react';

import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import SelectFormControl from './SelectFormControl';
import SelectIconButton from './SelectIconButton';

import { useThunkDispatch } from 'store';
import { setSort, SortFilter } from 'store/sort';
import { useSortState } from 'hooks';

// SortSelect component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      color: theme.palette.common.white
    },
    icon: {
      color: theme.palette.common.white,
      minWidth: 0,
      marginRight: 16
    }
  })
);

/**
 * Wraps select component for choosing sort filters
 */
const SortSelectContainer: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select sort filter from Redux store
  const sort = useSortState();

  // Menu component anchor status
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open menu component anchored on selected sort filter
  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu component
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Redirect to new sort page for select component
  const handleChange = (event: ChangeEvent<{ value: unknown }>): void => {
    const filter = sort.all.find(
      (s: SortFilter): boolean => s.key === (event.target.value as string)
    );
    if (filter !== undefined) {
      dispatch(setSort(filter));
    }
  };

  // Toggle sort filter
  const handleMenuItemClick = (
    filter: SortFilter
  ): VoidFunction => (): void => {
    dispatch(setSort(filter));
    setAnchorEl(null);
  };

  // Select options list
  const list = sort.all.map(
    (filter: SortFilter): ReactElement => (
      <MenuItem
        className={classes.menuItem}
        key={filter.key}
        value={filter.key}
        selected={filter.key === sort.current.key}
        onClick={handleMenuItemClick(filter)}
      >
        <ListItemIcon className={classes.icon}>
          <Icon fontSize="inherit">{filter.icon}</Icon>
        </ListItemIcon>
        <ListItemText
          primary={`${filter.key[0].toUpperCase()}${filter.key.substring(1)}`}
        />
      </MenuItem>
    )
  );

  return (
    <>
      {/* Full form control on desktop */}
      <Hidden xsDown implementation="css">
        <SelectFormControl sort={sort} handleChange={handleChange}>
          {list}
        </SelectFormControl>
      </Hidden>

      {/* Icon button with popup menu on mobile */}
      <Hidden smUp implementation="css">
        <SelectIconButton
          handleOpen={handleOpen}
          handleClose={handleClose}
          anchorEl={anchorEl}
          icon={sort.current.icon}
        >
          {list}
        </SelectIconButton>
      </Hidden>
    </>
  );
};

export default SortSelectContainer;
