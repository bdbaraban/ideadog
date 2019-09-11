import React, { ReactElement, useState } from 'react';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AboutDialog } from 'components';

// AboutButton component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: theme.palette.common.white
    }
  })
);

/**
 * Button to open/close AboutDialog, displayed at bottom of ApplicationBar
 */
const AboutButton = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // AboutDialog open/closed boolean
  const [open, setOpen] = useState<boolean>(false);

  // Open AboutDialog
  const handleOpen = (): void => {
    setOpen(true);
  };

  // Close AboutDialog
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Hidden xsDown implementation="css">
        <Button onClick={handleOpen} className={classes.button}>
          About
        </Button>
      </Hidden>
      <Hidden smUp implementation="css">
        <IconButton
          aria-haspopup="true"
          className={classes.button}
          onClick={handleOpen}
        >
          <LiveHelpIcon />
        </IconButton>
      </Hidden>
      <AboutDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default AboutButton;
