import React, { ReactElement } from 'react';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

/**
 * CustomTextField component styles
 */
const useInputStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      '&$focused': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`
      }
    },
    focused: {}
  })
);

/**
 * CustomTextField component styles
 */
const useInputLabelStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '&.Mui-focused': {
        color: theme.palette.common.white,
        opacity: 0.42
      }
    },
    error: {
      color: theme.palette.error.main
    }
  })
);

/**
 * Customized Material UI TextField component
 */
const CustomTextField = (props: TextFieldProps): ReactElement => {
  const InputProps = {
    classes: useInputStyles(),
    disableUnderline: true
  };

  return (
    <TextField
      InputLabelProps={{
        classes: useInputLabelStyles()
      }}
      InputProps={InputProps as Partial<OutlinedInputProps>}
      {...props}
    />
  );
};

export default CustomTextField;
