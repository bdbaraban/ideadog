import React, { FC } from 'react';

import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// ApplicationBarIcon component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    },
    icon: {
      color: theme.palette.common.white,
      width: 48
    }
  })
);

// ApplicationBarIconButton component prop types
type ApplicationBarIconButtonProps = Omit<
  IconButtonProps,
  'aria-controls' & 'aria-haspopup'
>;

/**
 * Custom styled icon button used in ApplicationBar
 */
const ApplicationBarIconButton: FC<ApplicationBarIconButtonProps> = ({
  className,
  children,
  ...rest
}: ApplicationBarIconButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <IconButton
        className={clsx(className, classes.icon)}
        aria-haspopup="true"
        {...rest}
      >
        {children}
      </IconButton>
    </Box>
  );
};

export default ApplicationBarIconButton;
