import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogTitle
} from 'components/common';
import ContactCard from './ContactCard';

// ContactDialog component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      color: theme.palette.common.white
    },
    box: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      width: '100%'
    }
  })
);

// ContactDialog component prop types
interface ContactDialogProps {
  open: boolean;
  handleClose: (value: string) => void;
}

/**
 * Contact IdeaDog dialog
 */
const ContactDialog: FC<ContactDialogProps> = ({
  open,
  handleClose
}: ContactDialogProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <CustomDialog
      size="444"
      onClose={handleClose}
      aria-labelledby="contact-dialog"
      open={open}
    >
      <CustomDialogTitle id="about-dialog-title">CONTACT US</CustomDialogTitle>
      <CustomDialogContent>
        <Typography
          variant="body1"
          align="center"
          className={classes.typography}
        >
          Martin & I are two software engineers passionate about static typing
          and the trendiest (but for a reason, always for a reason)
          technologies. Please do reach out to us!
        </Typography>
        <Box className={classes.box}>
          <ContactCard
            name="Brennan D Baraban"
            title="Front-End Developer"
            image="https://avatars2.githubusercontent.com/u/34765317?s=460&v=4"
            github="https://github.com/bdbaraban"
            linkedin="https://linkedin.com/in/bdbaraban"
            portfolio="https://bdov.dev"
          />
        </Box>
        <ContactCard
          name="Martin Smith"
          title="Back-End Developer"
          image="https://avatars0.githubusercontent.com/u/38019643?s=460&v=4"
          github="https://github.com/Ostoyae"
          linkedin="https://www.linkedin.com/in/martin-smith-a40a17171/"
          portfolio="https://msmith.online/"
        />
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default ContactDialog;
