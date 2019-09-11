import React, { ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ContactCard } from 'components';

// ContactDialog component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperProps: {
      height: 'min-content',
      maxWidth: 500,
      width: 'calc(100% - 96px)',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
        maxWidth: 'none',
        minWidth: '100vw'
      }
    },
    title: {
      color: theme.palette.common.white,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    content: {
      marginBottom: theme.spacing(2),
      paddingTop: 0
    },
    typography: {
      color: theme.palette.common.white
    },
    box: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
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
const ContactDialog = ({
  open,
  handleClose
}: ContactDialogProps): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="contact-dialog"
      open={open}
      PaperProps={{
        className: classes.paperProps
      }}
    >
      <DialogTitle id="about-dialog-title" className={classes.title}>
        CONTACT US
      </DialogTitle>
      <DialogContent className={classes.content}>
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
