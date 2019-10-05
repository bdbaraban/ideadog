import React, { FC } from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// FlipButton component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    text: {
      textTransform: 'none'
    }
  })
);

// FlipButton component prop types
interface FlipButtonProps extends ButtonProps {
  text: string;
}

/**
 * Button to flip between log in/sign up dialogs
 */
const FlipButton: FC<FlipButtonProps> = ({
  text,
  ...rest
}: FlipButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Button className={clsx(classes.button)} {...rest}>
      <Typography className={classes.text} color="secondary">
        {text}
      </Typography>
    </Button>
  );
};

export default FlipButton;
