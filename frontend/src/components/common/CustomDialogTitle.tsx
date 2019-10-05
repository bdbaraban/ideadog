import React, { FC } from 'react';

import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// CustomDialogTitle component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.common.white,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  })
);

/**
 * Custom styled Material-UI dialog title
 */
const CustomDialogTitle: FC<DialogTitleProps> = ({
  className,
  children,
  ...rest
}: DialogTitleProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <DialogTitle className={clsx(className, classes.title)} {...rest}>
      {children}
    </DialogTitle>
  );
};

export default CustomDialogTitle;
