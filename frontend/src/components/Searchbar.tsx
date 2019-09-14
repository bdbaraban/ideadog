import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  useState
} from 'react';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import {
  createStyles,
  fade,
  Theme,
  makeStyles
} from '@material-ui/core/styles';
import { useThunkDispatch } from 'store';
import { setSearch } from 'store/search/actions';

/**
 * Searchbar component styles
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      position: 'relative',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(2)
      }
    },
    searchIcon: {
      color: theme.palette.common.white,
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mobileSearchIcon: {
      color: theme.palette.common.white,
      width: 48
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      color: theme.palette.common.white,
      padding: theme.spacing(1, 1, 1, 7),
      width: '100%'
    },
    paper: {
      padding: theme.spacing(2)
    }
  })
);

/**
 * Searchbar component positioned second from top right in Navbar
 */
const Searchbar = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Search text
  const [text, setText] = useState<string>('');

  // Save text input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  // Filter tags by search query
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      dispatch(setSearch(text));
      event.preventDefault();
    }
  };

  // Search popover anchoring for mobile menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Open search popover menu for mobile
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close search popover menu for mobile
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const SearchField = (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        placeholder="Search..."
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );

  return (
    <>
      <Hidden xsDown implementation="css">
        {SearchField}
      </Hidden>
      <Hidden smUp implementation="css">
        <IconButton
          className={classes.mobileSearchIcon}
          aria-controls="searchbar-popper"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SearchIcon />
        </IconButton>
        <Popover
          classes={{
            paper: classes.paper
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right'
          }}
        >
          {SearchField}
        </Popover>
      </Hidden>
    </>
  );
};

export default Searchbar;
