import React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

const NewIdeaTextField = (props: TextFieldProps): React.ReactElement => {
  const useTextStyles = makeStyles(
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

  const InputProps = {
    classes: useTextStyles(),
    disableUnderline: true
  };

  return (
    <TextField
      id="new-idea-text-field"
      autoFocus={true}
      InputProps={InputProps as Partial<OutlinedInputProps>}
      fullWidth={true}
      label="I've got a bright new idea..."
      margin="none"
      multiline
      placeholder="A dog hotel, for humans."
      {...props}
    />
  );
};

export default NewIdeaTextField;
