import React, { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import {
  createMuiTheme,
  createStyles,
  fade,
  makeStyles,
  MuiThemeProvider,
  Theme
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { SortFilter, SortState } from 'store/sort/types';
import { setSort } from 'store/sort/actions';

// SortSelect component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      borderRadius: 4,
      width: '100%',
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      '&:focus': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
    },
    root: {
      color: theme.palette.common.white
    },
    select: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      width: '100%'
    },
    icon: {
      color: theme.palette.common.white,
      minWidth: 0,
      marginRight: 16
    },
    mobileIcon: {
      color: theme.palette.common.white
    },
    menuItem: {
      color: theme.palette.common.white
    }
  })
);

/**
 * Select component for choosing sort filters
 */
const SortSelect = (): ReactElement => {
  // Select material-UI styles
  const classes = useStyles();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select sort filter from Redux store
  const sort = useSelector((state: AppState): SortState => state.sort);

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

  const list = sort.all.map(
    (filter: SortFilter): ReactElement => (
      <MenuItem
        key={filter.key}
        value={filter.key}
        className={classes.menuItem}
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
      <Hidden xsDown>
        <FormControl className={classes.formControl} variant="outlined">
          <MuiThemeProvider
            theme={createMuiTheme({
              overrides: {
                MuiOutlinedInput: {
                  notchedOutline: {
                    border: 'none'
                  },
                  input: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }
              }
            })}
          >
            <Select
              classes={{
                root: classes.root,
                select: classes.select,
                icon: classes.icon
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#fff',
                    backgroundColor: 'rgba(48, 60, 108, 1)'
                  }
                }
              }}
              displayEmpty
              value={sort.current.key}
              onChange={handleChange}
              input={
                <OutlinedInput labelWidth={0} name="sort" id="outlined-sort" />
              }
            >
              {list}
            </Select>
          </MuiThemeProvider>
        </FormControl>
      </Hidden>
      <Hidden smUp>
        <IconButton
          aria-haspopup="true"
          className={classes.mobileIcon}
          onClick={handleOpen}
        >
          <Icon>{sort.current.icon}</Icon>
        </IconButton>
        <Menu
          id="sort-filter-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {list}
        </Menu>
      </Hidden>
    </>
  );
};

export default SortSelect;
