import React, { FC } from 'react';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// CustomDialog component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperProps: {
      height: 'min-content',
      width: 'calc(100% - 96px)',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
        maxWidth: 'none',
        minWidth: '100vw'
      }
    },
    '444': {
      maxWidth: 444
    },
    '540': {
      maxWidth: 540
    }
  })
);

// CustomDialog component prop types
type CustomDialogProps = Omit<DialogProps, 'PaperProps'> & {
  size: '444' | '540';
};

/**
 * Custom styled Material-UI dialog
 */
const CustomDialog: FC<CustomDialogProps> = ({
  children,
  size,
  ...rest
}: CustomDialogProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Dialog
      PaperProps={{
        className: clsx(classes.paperProps, classes[size])
      }}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
