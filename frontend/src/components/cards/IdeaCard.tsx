import React from 'react';
import {
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
  Button
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { Styles } from 'jss';
import IconButton from '@material-ui/core/IconButton';
import ClassOutlined from '@material-ui/icons/ClassOutlined';
import Forward from '@material-ui/icons/Forward';
import CopyToClipboard from '../CopyToClipboard';
import { Link } from 'react-navi';
import { Idea } from '../../api';
import { HappyTully, SadTully } from '../../icons';

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
        width: '55%'
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
        width: '15%'
      },
      shareDialogTitle: {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      shareDialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      link: {
        color: theme.palette.secondary.main,
        '&:hover': {
          color: theme.palette.secondary.dark
        }
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

interface IdeaCardProps {
  idea: Idea;
}

const IdeaCard = ({ idea }: IdeaCardProps): React.ReactElement => {
  const classes = useStyles();
  const bulletPoint = <span className={classes.bullet}>•</span>;

  const [open, setOpen] = React.useState<boolean>(false);
  const [upvotes, setUpvotes] = React.useState<number>(idea.upvotes);
  const [downvotes, setDownvotes] = React.useState<number>(idea.downvotes);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleUpvoteClick = (): void => {
    setUpvotes(upvotes + 1);
  };
  const handleDownvoteClick = (): void => {
    setDownvotes(downvotes + 1);
  };

  const convertedDate: Date = new Date(idea.date);

  return (
    <Card raised={true} className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          @{idea.owner.name} {bulletPoint} {months[convertedDate.getUTCMonth()]}{' '}
          {convertedDate.getUTCDay()}, {convertedDate.getUTCFullYear()}
        </Typography>
        <Typography className={classes.text}>{idea.text}</Typography>
        <Container className={classes.footer}>
          <Container className={classes.buttons}>
            <Button onClick={handleUpvoteClick}>
              <SvgIcon
                className={classes.happy}
                component={(): React.ReactElement =>
                  HappyTully(
                    42,
                    upvotes / (upvotes + downvotes) < 0.1
                      ? 0.1
                      : upvotes / (upvotes + downvotes)
                  )
                }
              >
                &nbsp;
              </SvgIcon>
            </Button>
            <Button onClick={handleDownvoteClick}>
              <SvgIcon
                component={(): React.ReactElement =>
                  SadTully(
                    42,
                    downvotes / (upvotes + downvotes) < 0.1
                      ? 0.1
                      : downvotes / (upvotes + downvotes)
                  )
                }
              >
                &nbsp;
              </SvgIcon>
            </Button>
          </Container>
          <Container className={classes.tags}>
            {idea.tags.map(
              (tag: string): React.ReactElement => {
                const uppercaseTag = `${tag.charAt(0).toUpperCase()}${tag.slice(
                  1
                )}`;
                return (
                  <Chip
                    key={uppercaseTag}
                    label={uppercaseTag}
                    className={classes.chip}
                  />
                );
              }
            )}
          </Container>
          <Container className={classes.share}>
            <IconButton onClick={handleOpen} color="inherit">
              <Forward fontSize="large" />
            </IconButton>
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
                  <Link href={`/idea/${idea.key}`} className={classes.link}>
                    localhost:1234/idea/{idea.key}
                  </Link>
                  <CopyToClipboard
                    TooltipProps={{ title: 'Copied', leaveDelay: 1000 }}
                  >
                    {({ copy }): React.ReactElement => (
                      <IconButton
                        color="inherit"
                        onClick={(): void =>
                          copy(`localhost:1234/idea/${idea.key}`)
                        }
                      >
                        <ClassOutlined fontSize="large" />
                      </IconButton>
                    )}
                  </CopyToClipboard>
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
