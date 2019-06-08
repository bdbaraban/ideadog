import React from 'react';
import { InputLabel, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Styles } from 'jss';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      formControl: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        transform: 'translate(0, 31px) scale(1)'
      },
      shrink: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left'
      }
    })
);

const TagsInputLabel = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <InputLabel classes={classes} htmlFor="multiple-tags-select">
      Tags (max 3)
    </InputLabel>
  );
};

export default TagsInputLabel;
