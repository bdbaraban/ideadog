import React from 'react';
import {
  createStyles,
  Hidden,
  InputBase,
  makeStyles,
  Theme
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';

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
        marginLeft: theme.spacing(1),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto'
        }
      },
      icon: {
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
        padding: theme.spacing(1, 1, 1, 5.5),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.down('xs')]: {
          width: 30,
          '&:focus': {
            width: 85
          }
        },
        [theme.breakpoints.up('sm')]: {
          width: 160,
          '&:focus': {
            width: 200
          }
        }
      }
    })
);

/**
 * Searchbar component
 */
const Searchbar = (): React.ReactElement => {
  const classes = useStyles();

  const [text, setText] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <Hidden smUp>
        <InputBase
          placeholder="…"
          classes={{
            root: classes.root,
            input: classes.input
          }}
        />
      </Hidden>
      <Hidden xsDown>
        <InputBase
          classes={{
            root: classes.root,
            input: classes.input
          }}
          placeholder="Search..."
          value={text}
          onChange={handleChange}
        />
      </Hidden>
    </div>
  );
};

export default React.memo(Searchbar);
