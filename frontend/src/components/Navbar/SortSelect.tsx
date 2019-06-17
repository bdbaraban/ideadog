import React from 'react';
import {
  createMuiTheme,
  createStyles,
  FormControl,
  Hidden,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  Theme
} from '@material-ui/core';
import { MuiThemeProvider, fade } from '@material-ui/core/styles';
import { Styles } from 'jss';
import { useCurrentRoute, useNavigation } from 'react-navi';

/**
 * SortSelect Material UI style overrides
 */
const theme = (): Theme =>
  createMuiTheme({
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
  });

/**
 * SortSelect component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      formControl: {
        background: fade(theme.palette.common.white, 0.15),
        border: 'none',
        borderRadius: 4,
        margin: theme.spacing(1),
        marginRight: 12,
        minWidth: 120,
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
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        width: 'auto'
      },
      icon: {
        color: theme.palette.common.white,
        minWidth: 27
      },
      menuItem: {
        color: theme.palette.common.white
      },
      responsive: {
        fontSize: '1.7rem'
      }
    })
);

/**
 * Sort filter type
 */
interface SortFilter {
  sort: string;
  text: string;
  icon: React.ReactElement;
}

/**
 * SortSelect component prop types
 */
interface SortSelectProps {
  // Current idea-sorting filter
  sort: string;
}

/**
 * Select component for choosing sort filters
 */
const SortSelect = ({ sort }: SortSelectProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  // Available sorting filters
  const filters: SortFilter[] = [
    {
      sort: 'home',
      text: 'All',
      icon: <Icon fontSize="inherit">sort</Icon>
    },
    {
      sort: 'bright',
      text: 'Bright',
      icon: <Icon fontSize="inherit">brightness_5</Icon>
    }
  ];

  // Menu component anchor status
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Open menu component anchored on selected sort filter
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu component
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Array indices codex for filters
  const filtersCodex: string[] = ['home', 'bright'];

  // Refresh page with new sort
  const refresh = (sort: string): void => {
    let redirect = `/${encodeURIComponent(sort)}`;
    if (route.url.query.tags !== undefined) {
      redirect += `?tags=${encodeURIComponent(route.url.query.tags)}`;
    }
    navigation.navigate(redirect);
  };

  // Redirect to new sort page for select component
  const handleChange = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ): void => {
    if (typeof event.target.value === 'string') {
      refresh(event.target.value);
    }
  };

  // Redirect to new sort page for menu component
  const handleMenuItemClick = (filter: SortFilter): void => {
    refresh(filter.sort);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Hidden xsDown>
        <FormControl className={classes.formControl} variant="outlined">
          <MuiThemeProvider theme={theme}>
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
              value={sort}
              onChange={handleChange}
              input={
                <OutlinedInput labelWidth={0} name="sort" id="outlined-sort" />
              }
            >
              {filters.map(
                (filter: SortFilter): React.ReactElement => (
                  <MenuItem key={filter.sort} value={filter.sort}>
                    <ListItemIcon className={classes.icon}>
                      {filter.icon}
                    </ListItemIcon>
                    {filter.text}
                  </MenuItem>
                )
              )}
            </Select>
          </MuiThemeProvider>
        </FormControl>
      </Hidden>

      <Hidden smUp>
        <IconButton
          classes={{ root: classes.responsive }}
          aria-controls="customized-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClickListItem}
        >
          {filters[filtersCodex.indexOf(sort)].icon}
        </IconButton>
        <Menu
          id="sort-filter-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {filters.map(
            (filter: SortFilter): React.ReactElement => (
              <MenuItem
                key={filter.sort}
                className={classes.menuItem}
                selected={sort === filter.sort}
                onClick={(): void => handleMenuItemClick(filter)}
              >
                <ListItemIcon className={classes.icon}>
                  {filter.icon}
                </ListItemIcon>
                <ListItemText primary={filter.text} />
              </MenuItem>
            )
          )}
        </Menu>
      </Hidden>
    </React.Fragment>
  );
};

export default React.memo(SortSelect);
