import React from 'react';
import {
  createStyles,
  Hidden,
  Icon,
  IconButton,
  InputBase,
  makeStyles,
  Popover,
  Theme
} from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import { useCurrentRoute, useNavigation } from 'react-navi';

/**
 * Searchbar component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto'
        }
      },
      icon: {
        color: theme.palette.common.white,
        width: 'auto',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1.5),
        marginRight: theme.spacing(1)
      },
      root: {
        color: 'inherit'
      },
      input: {
        color: theme.palette.common.white,
        padding: theme.spacing(1, 1, 1, 5.5),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
          width: 160,
          '&:focus': {
            width: 200
          }
        }
      },
      paper: {
        padding: 16
      },
      searchIcon: {
        marginRight: -4
      },
      responsive: {
        fontSize: '1.7rem'
      }
    })
);

/**
 * Searchbar component positioned second from top right in Navbar
 */
const Searchbar = (): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();
  const route = useCurrentRoute();

  // Search text
  const [text, setText] = React.useState<string>('');

  // Field focus
  const [focus, setFocus] = React.useState(false);

  // Save text input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  // Filter tags by search query
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      let redirect = route.url.pathname;
      if (route.url.query.tags) {
        redirect += `?tags=${route.url.query.tags}`;
      }
      if (text !== '') {
        redirect += `?q=${encodeURIComponent(text)}`;
      }
      navigation.navigate(redirect);
      setText('');
      setFocus(false);
      event.preventDefault();
    }
  };

  // Search popover anchoring for mobile menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Open search popover menu for mobile
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  // Close search popover menu for mobile
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const SearchField = (
    <div className={classes.search}>
      <div className={classes.icon}>
        <Icon>search</Icon>
      </div>
      <InputBase
        classes={{
          root: classes.root,
          input: classes.input
        }}
        placeholder="Search..."
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoFocus={focus}
        key={`search-${focus}`}
        onFocus={(): void => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );

  return (
    <React.Fragment>
      <Hidden xsDown>{SearchField}</Hidden>
      <Hidden smUp>
        <IconButton
          classes={{ root: classes.searchIcon }}
          aria-controls="searchbar-popper"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <Icon classes={{ root: classes.responsive }}>search</Icon>
        </IconButton>
        <Popover
          classes={{
            paper: classes.paper
          }}
          id={open ? 'simple-popper' : undefined}
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
    </React.Fragment>
  );
};
export default React.memo(Searchbar);
