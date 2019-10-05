import React, { FC } from 'react';

import Button, { ButtonProps } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// TextButton component styles
const useStyles = makeStyles(() =>
  createStyles({
    text: {
      textTransform: 'none'
    }
  })
);

// TextButton component prop types
interface TextButtonProps extends ButtonProps {
  text: string;
}

/**
 * Plain text button
 */
const TextButton: FC<TextButtonProps> = ({
  text,
  ...rest
}: TextButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Button {...rest}>
      <Typography className={classes.text} color="secondary">
        {text}
      </Typography>
    </Button>
  );
};

export default TextButton;
