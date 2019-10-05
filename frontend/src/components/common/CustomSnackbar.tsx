import React, { FC } from 'react';

import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// CustomSnackbar component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbarContent: {
      alignItems: 'center',
      display: 'flex',
      fontWeight: 'bold',
      justifyContent: 'center'
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main
    },
    error: {
      backgroundColor: theme.palette.error.main
    }
  })
);

// CustomSnackbar component prop types
type CustomSnackbarProps = Omit<
  SnackbarProps,
  'anchorOrigin' & 'ContentProps'
> & {
  color?: 'secondary' | 'error';
  label: string;
};

/**
 * Custom styled Material-UI snackbar
 */
const CustomSnackbar: FC<CustomSnackbarProps> = ({
  color = 'secondary',
  label,
  ...rest
}: CustomSnackbarProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      autoHideDuration={5000}
      ContentProps={{
        'aria-describedby': label,
        className: clsx(classes.snackbarContent, classes[color])
      }}
      {...rest}
    />
  );
};

export default CustomSnackbar;
