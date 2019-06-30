import React from 'react';
import { createStyles, InputLabel, makeStyles, Theme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { Styles } from 'jss';

/**
 * TagsInputLabel component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        color: `${fade(theme.palette.common.white, 0.5)} !important`
      },
      formControl: {
        transform: 'translate(0, 31px) scale(1)'
      },
      shrink: {
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
