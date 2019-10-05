import React, { FC, useState } from 'react';

import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import ContactDialog from './ContactDialog';

// ContactButton component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: theme.palette.common.white
    }
  })
);

/**
 * Button to open/close ContactDialog, displayed at bottom of ApplicationBar
 */
const ContactButton: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  // ContactDialog open/closed boolean
  const [open, setOpen] = useState<boolean>(false);

  // Open ContactDialog
  const handleOpen = (): void => {
    setOpen(true);
  };

  // Close ContactDialog
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Hidden xsDown implementation="css">
        <Button onClick={handleOpen} className={classes.button}>
          Contact
        </Button>
      </Hidden>
      <Hidden smUp implementation="css">
        <IconButton
          aria-haspopup="true"
          className={classes.button}
          onClick={handleOpen}
        >
          <MailIcon />
        </IconButton>
      </Hidden>
      <ContactDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default ContactButton;
