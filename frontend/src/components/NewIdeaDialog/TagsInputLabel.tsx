import React from 'react';
import { createStyles, InputLabel, makeStyles, Theme } from '@material-ui/core';
import { Styles } from 'jss';

/**
 * TagsInputLabel component style
 */
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

/**
 * Label for tags select used by NewIdeaDialog
 */
const TagsInputLabel = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <InputLabel classes={classes} htmlFor="multiple-tags-select">
      Tags (max 3)
    </InputLabel>
  );
};

export default React.memo(TagsInputLabel);
