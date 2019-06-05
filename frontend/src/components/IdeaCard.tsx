import React from 'react';
import Card from '@material-ui/core/Card';
import {
  Button,
  CardContent,
  Container,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Theme,
  Typography,
  SvgIcon,
  Icon
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { Styles } from 'jss';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles';
import { Idea } from '../api/useIdeas';
import HappyTully from '../icons/HappyTully';
import SadTully from '../icons/SadTully';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white,
        width: '100%'
      },
      title: {
        color: fade(theme.palette.common.white, 0.5),
        fontSize: 14
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
      },
      text: {
        paddingBottom: theme.spacing(1.5),
        borderBottom: `1px solid ${fade(theme.palette.common.white, 0.5)}`
      },
      footer: {
        display: 'flex',
        margin: 0,
        padding: 0
      },
      buttons: {
        borderRight: `1px solid ${fade(theme.palette.common.white, 0.5)}`,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '30%'
      },
      tags: {
        borderRight: `1px solid ${fade(theme.palette.common.white, 0.5)}`,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '50%'
      },
      chip: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        color: theme.palette.common.white,
        margin: 2
      },
      share: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '20%'
      },
      shareDialogTitle: {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      shareDialogContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }
    })
);

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const IdeaCard = (props: { idea: Idea }): React.ReactElement => {
  const classes = useStyles();
  const idea = props.idea;
  const bulletPoint = <span className={classes.bullet}>•</span>;

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Card raised={true} className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          @{idea.username} {bulletPoint} {months[idea.createdAt.getUTCMonth()]}{' '}
          {idea.createdAt.getUTCDay()}, {idea.createdAt.getUTCFullYear()}
        </Typography>
        <Typography className={classes.text}>{idea.text}</Typography>
        <Container className={classes.footer}>
          <Container className={classes.buttons}>
            <SvgIcon
              className={classes.happy}
              component={(): React.ReactElement =>
                HappyTully(42, idea.upvotes / (idea.upvotes + idea.downvotes))
              }
            >
              &nbsp;
            </SvgIcon>
            <SvgIcon
              component={(): React.ReactElement =>
                SadTully(42, idea.downvotes / (idea.upvotes + idea.downvotes))
              }
            >
              &nbsp;
            </SvgIcon>
          </Container>
          <Container className={classes.tags}>
            {idea.tags.map(
              (tag: string): React.ReactElement => (
                <Chip key={tag} label={tag} className={classes.chip} />
              )
            )}
          </Container>
          <Container className={classes.share}>
            <Button onClick={handleOpen} color="inherit">
              <Icon
                className={clsx(classes.icon, 'fas fa-share')}
                fontSize="default"
              />
            </Button>
            <Dialog
              onClose={handleClose}
              aria-labelledby="share-idea-dialog"
              open={open}
            >
              <DialogTitle
                id="share-idea-dialog-title"
                className={classes.shareDialogTitle}
              >
                Share this great idea.
                <DialogContent className={classes.shareDialogContent}>
                  <Button color="inherit">
                    <Icon
                      fontSize="large"
                      className={clsx(classes.icon, 'fab fa-twitter')}
                    />
                  </Button>
                  <Button color="inherit">
                    <Icon
                      fontSize="large"
                      className={clsx(classes.icon, 'fab fa-facebook-square')}
                    />
                  </Button>
                  <Button color="inherit">
                    <Icon
                      fontSize="large"
                      className={clsx(classes.icon, 'fab fa-reddit')}
                    />
                  </Button>
                </DialogContent>
              </DialogTitle>
            </Dialog>
          </Container>
        </Container>
      </CardContent>
    </Card>
  );
};

IdeaCard.propTypes = {
  idea: PropTypes.object.isRequired
};

export default IdeaCard;
