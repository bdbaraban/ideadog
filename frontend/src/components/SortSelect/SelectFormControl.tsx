import React, { ChangeEvent, FC } from 'react';

import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
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

import { SortState } from 'store/sort';

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
      minWidth: 0
    }
  })
);

// SelectFormControl component prop types
interface SelectFormControlProps extends FormControlProps {
  handleChange: (event: ChangeEvent<{ value: unknown }>) => void;
  sort: SortState;
}

/**
 * Custom styled select component
 */
const SelectFormControl: FC<SelectFormControlProps> = ({
  handleChange,
  sort,
  children
}: SelectFormControlProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
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
          {children}
        </Select>
      </MuiThemeProvider>
    </FormControl>
  );
};

export default SelectFormControl;
