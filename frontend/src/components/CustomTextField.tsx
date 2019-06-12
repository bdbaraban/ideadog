import React from 'react';
import { makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';

/**
 * CustomTextField component styles
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
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
 * Customized Material UI TextField component
 */
const CustomTextField = (props: TextFieldProps): React.ReactElement => {
  const InputProps = {
    classes: useStyles(),
    disableUnderline: true
  };

  return (
    <TextField
      InputProps={InputProps as Partial<OutlinedInputProps>}
      {...props}
    />
  );
};

export default React.memo(CustomTextField);
