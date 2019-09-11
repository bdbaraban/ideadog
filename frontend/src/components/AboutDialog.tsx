import React, { ReactElement } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles
} from '@material-ui/core/styles';

// AboutDialog component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperProps: {
      height: 'min-content',
      maxWidth: 444,
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
    infoTitle: {
      fontWeight: 'bold'
    },
    heading: {
      fontWeight: 'bold'
    },
    expansionPanel: {
      borderRadius: 4,
      backgroundColor: 'rgba(255, 255, 255, .15)',
      marginTop: 5
    },
    link: {
      color: theme.palette.secondary.main
    }
  })
);

// Custom Material UI expansion panel
const ExpansionPanel = withStyles({
  root: {
    '&:before': {
      backgroundColor: 'transparent'
    }
  }
})(MuiExpansionPanel);

// AboutDialog component prop types
interface AboutDialogProps {
  open: boolean;
  handleClose: (value: string) => void;
}

/**
 * About IdeaDog FAQ dialog
 */
const AboutDialog = ({ open, handleClose }: AboutDialogProps): ReactElement => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="about-dialog"
      open={open}
      PaperProps={{
        className: classes.paperProps
      }}
    >
      <DialogTitle id="about-dialog-title" className={classes.title}>
        FAQ
      </DialogTitle>
      <DialogContent className={classes.content}>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-is-this-content"
            id="what-is-this-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                What is this?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              IdeaDog is a social media platform for sharing ideas.{' '}
              <span role="img" aria-label="light-bulb">
                💡
              </span>
              <br />
              <br />
              We&apos;ve all had those moments, those sudden bursts of
              inspiration where we go - &quot;wow, that is simply a <i>
                great
              </i>{' '}
              idea&quot; - but know we will never follow up.
              <br />
              <br />
              Now, instead of losing those ideas, share them with the world!
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="whats-the-dogs-name-content"
            id="whats-the-dogs-name-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                What&apos;s the dog&apos;s name?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              His name is Tully, and he is a beloved boy{' '}
              <span role="img" aria-label="dog">
                🐕
              </span>
              .
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="how-does-login-work-content"
            id="how-does-login-work-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                How does login work?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              Super easily! Upon entering your email, we will send you a
              one-time &quot;magic link&quot;{' '}
              <span role="img" aria-label="sparkles">
                ✨
              </span>
              . Clicking the link will trigger a verification on our end, after
              which you will be redirected back here, logged in and enabled to
              share some great ideas!
              <br />
              <br />
              Note that for verification to succeed, you must open the link in
              the same brower you submitted your initial login request. The link
              will expire after 15 minutes.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                What is the tech stack behind this?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              Ah, our kind of question. We like to call IdeaDog
              &quot;statically-typed&quot; - that is, the front-end is built in
              React, using TypeScript, while the back-end features a Rust web
              server. In our book: TypeScript + Rust = The Ultimate
              Statically-Typed Web App{' '}
              <span role="img" aria-label="flexed-biceps">
                💪
              </span>
              .
              <br />
              <br />
              In addition, IdeaDog utilizes Next.js and Express.js for a
              server-side-rendered front-end, Material-UI for the design/web
              components, and an ArangoDB database.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                Can I see the code behind this?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              <a
                href="https://github.com/bdbaraban/ideadog"
                aria-label="IdeaDog GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                Please do!
              </a>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
