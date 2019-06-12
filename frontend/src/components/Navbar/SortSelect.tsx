import React from 'react';
import {
  createMuiTheme,
  createStyles,
  FormControl,
  Icon,
  makeStyles,
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
        color: theme.palette.common.white
      },
      sideIcon: {
        marginRight: theme.spacing(1)
      }
    })
);

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

  // Redirect to new sort page
  const handleChange = (
    event: React.ChangeEvent<{ value: string | unknown }>
  ): void => {
    if (typeof event.target.value === 'string') {
      let redirect = `/${encodeURIComponent(event.target.value)}`;
      if (route.url.query.tags !== undefined) {
        redirect += `?tags=${encodeURIComponent(route.url.query.tags)}`;
      }
      navigation.navigate(redirect);
    }
  };

  return (
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
          displayEmpty={true}
          value={sort}
          onChange={handleChange}
          input={
            <OutlinedInput labelWidth={0} name="sort" id="outlined-sort" />
          }
        >
          <MenuItem value={'home'}>
            <Icon className={classes.sideIcon} fontSize="inherit">
              sort
            </Icon>
            All
          </MenuItem>
          <MenuItem value={'bright'}>
            <Icon className={classes.sideIcon} fontSize="inherit">
              brightness_5
            </Icon>
            Bright
          </MenuItem>
        </Select>
      </MuiThemeProvider>
    </FormControl>
  );
};

export default React.memo(SortSelect);
