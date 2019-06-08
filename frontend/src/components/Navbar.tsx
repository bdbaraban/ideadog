import React from 'react';
import {
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  createMuiTheme,
  Button
} from '@material-ui/core';
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Styles } from 'jss';
import { useNavigation, useCurrentRoute } from 'react-navi';
import { HappyTully } from '../icons';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          display: 'block'
        }
      },
      formControl: {
        background: fade(theme.palette.common.white, 0.15),
        border: 'none',
        borderRadius: 4,
        margin: theme.spacing(1),
        minWidth: 120,
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        '&:focus': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        }
      },
      selectRoot: {
        color: theme.palette.common.white
      },
      selectSelect: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2)
      },
      selectIcon: {
        color: theme.palette.common.white
      },
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
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      inputRoot: {
        color: 'inherit'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200
          }
        }
      }
    })
);

interface NavbarProps {
  sort: string;
}

const Navbar = ({ sort }: NavbarProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  const routeHome = (): void => {
    navigation.navigate('/home');
  };

  const handleChange = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ): void => {
    if (typeof event.target.value === 'string') {
      const redirect =
        route.url.query.tags !== undefined
          ? `/${encodeURIComponent(
              event.target.value
            )}?tags=${encodeURIComponent(route.url.query.tags)}`
          : `/${encodeURIComponent(event.target.value)}`;
      navigation.navigate(redirect);
    }
  };

  return (
    <AppBar color="primary" className={classes.root}>
      <Toolbar>
        <Button onClick={routeHome}>
          <SvgIcon component={(): React.ReactElement => HappyTully(46, 1)}>
            &nbsp;
          </SvgIcon>
        </Button>
        <Typography
          className={classes.title}
          variant="h5"
          color="inherit"
          noWrap
        >
          IdeaDog
        </Typography>

        <FormControl variant="outlined" className={classes.formControl}>
          <MuiThemeProvider
            theme={createMuiTheme({
              overrides: {
                MuiOutlinedInput: {
                  notchedOutline: {
                    border: 'none'
                  }
                }
              }
            })}
          >
            <Select
              displayEmpty={true}
              classes={{
                root: classes.selectRoot,
                outlined: classes.outlined,
                select: classes.selectSelect,
                icon: classes.selectIcon
              }}
              inputProps={{
                classes: classes.outlined
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#fff',
                    backgroundColor: 'rgba(48, 60, 108, 1)'
                  }
                }
              }}
              value={sort}
              onChange={handleChange}
              input={
                <OutlinedInput
                  labelWidth={0}
                  name="sort"
                  id="outlined-age-simple"
                />
              }
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'bright'}>Bright</MenuItem>
            </Select>
          </MuiThemeProvider>
        </FormControl>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
