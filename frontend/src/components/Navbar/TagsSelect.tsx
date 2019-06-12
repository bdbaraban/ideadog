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
import { CheckboxTag } from '../../types';
import { TagsMenuList } from '..';

/**
 * TagsSelect Material UI style overrides
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
      },
      MuiMenuItem: {
        gutters: {
          paddingRight: 'auto'
        }
      },
      MuiSvgIcon: {
        root: {
          color: 'white',
          '&:hover': {
            color: 'white'
          }
        }
      }
    }
  });

/**
 * TagsSelect component style
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
        paddingLeft: theme.spacing(2)
      },
      mainIcon: {
        color: theme.palette.common.white
      },
      sideIcon: {
        marginRight: theme.spacing(1)
      }
    })
);

/**
 * TagsSelect component prop types
 */
interface TagsSelectProps {
  // Array of currently-checked tag names
  checkboxTags: CheckboxTag[];
}

/**
 * Select component for choosing tag filters
 */
const TagsSelect = ({ checkboxTags }: TagsSelectProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <MuiThemeProvider theme={theme}>
        <Select
          classes={{
            root: classes.root,
            select: classes.select,
            icon: classes.mainIcon
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
          value={'Tags'}
          input={
            <OutlinedInput labelWidth={0} name="sort" id="outlined-tags" />
          }
        >
          <MenuItem value={'Tags'}>
            <Icon className={classes.sideIcon} fontSize="inherit">
              local_offer
            </Icon>
            Tags
          </MenuItem>
          <TagsMenuList checkboxTags={checkboxTags} />
        </Select>
      </MuiThemeProvider>
    </FormControl>
  );
};

export default React.memo(TagsSelect);
