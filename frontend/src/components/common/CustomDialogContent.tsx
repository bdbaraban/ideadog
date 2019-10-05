import React, { FC } from 'react';

import DialogContent, {
  DialogContentProps
} from '@material-ui/core/DialogContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// CustomDialogContent component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: theme.spacing(1),
      overflowY: 'initial',
      paddingBottom: theme.spacing(2),
      paddingTop: 0,
      width: '100%'
    }
  })
);

/**
 * Custom styled Material-UI dialog content
 */
const CustomDialogContent: FC<DialogContentProps> = ({
  className,
  children,
  ...rest
}: DialogContentProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <DialogContent className={clsx(className, classes.content)} {...rest}>
      {children}
    </DialogContent>
  );
};

export default CustomDialogContent;
