import React from 'react';
import Card from '@material-ui/core/Card';
import {
  CardContent,
  createStyles,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Theme,
  Typography,
  withStyles
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Styles } from 'jss';

/**
 * AboutCard component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      },
      cardContent: {
        '&:last-child': {
          paddingBottom: 16
        }
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

/**
 * Custom Material UI expansion panel
 */
const ExpansionPanel = withStyles({
  root: {
    '&:before': {
      backgroundColor: 'transparent'
    }
  }
})(MuiExpansionPanel);

/**
 * About card component, displayed at bottom of InfoGrid
 */
const AboutCard = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised={true}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.infoTitle} color="textSecondary">
          About
        </Typography>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div className={classes.column}>
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
              IdeaDog is a social platform for sharing ideas.
              <br />
              <br />
              We&apos;ve all had those sudden bursts of inspiration where we go
              - &quot;wow, that is simply a <i>great</i> idea&quot; - but know
              we will never follow up.
              <br />
              <br />
              Now, instead of losing those ideas, share them with the world!
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div className={classes.column}>
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
              His name is Tully, and he is a beloved boy.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div className={classes.column}>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                How is brightness calculated?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              brightness = upvotes / (upvotes + downvotes)
              <br />
              <br />
              Brightness corresponds directly to the transparency of the
              happy/sad Tully indicators on ideas. We will never display numeric
              ratings on ideas.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div className={classes.column}>
              <Typography
                className={classes.heading}
                color="textSecondary"
                variant="subtitle1"
              >
                Who are you two?
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography color="textSecondary" variant="body1">
              Martin and I are two software engineers passionate about static
              typing and the most trendy (but for a reason, always for a reason)
              technologies. Reach out to us at our contact links above!
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            aria-controls="what-about-content"
            id="what-about-header"
            expandIcon={<ExpandMoreIcon color="secondary" />}
          >
            <div className={classes.column}>
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
      </CardContent>
    </Card>
  );
};

export default React.memo(AboutCard);
