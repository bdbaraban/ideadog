import React, { FC } from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// SubmitButton component styles
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      fontWeight: 'bold'
    }
  })
);

// SubmitButton component prop types
type SubmitButtonProps = Omit<ButtonProps, 'variant' & 'color' & 'size'>;

/**
 * Button to submit login/sign up request
 */
const SubmitButton: FC<SubmitButtonProps> = ({
  className,
  ...rest
}: SubmitButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Button
      className={clsx(className, classes.button)}
      variant="contained"
      color="secondary"
      size="large"
      {...rest}
    >
      Submit
    </Button>
  );
};

export default SubmitButton;
