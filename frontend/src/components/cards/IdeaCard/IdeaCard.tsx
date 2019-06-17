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
  Typography
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import { Styles } from 'jss';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import Forward from '@material-ui/icons/Forward';
import CopyToClipboard from '../../CopyToClipboard';
import { Link } from 'react-navi';
import { Idea } from '../../../types';
import { MONTHS } from '../../../constants';
import { Voters } from '.';

/**
 * IdeaCard component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white,
        width: '100%'
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      title: {
        color: fade(theme.palette.common.white, 0.5),
        fontSize: 14
      },
      userLink: {
        color: fade(theme.palette.common.white, 0.5),
        textDecoration: 'none',
        textTransform: 'none'
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
      closeIcon: {
        display: 'flex',
        alignSelf: 'flex-start',
        margin: theme.spacing(0.5)
      },
      footer: {
        display: 'flex',
        margin: 0,
        padding: 0
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
      },
      happy: {
        transform: 'scale(1.1)'
      }
    })
);

/**
 * IdeaCard component prop types
 */
interface IdeaCardProps {
  // Idea to display
  idea: Idea;
}

/**
 * Idea card template component
 */
const IdeaCard = ({ idea }: IdeaCardProps): React.ReactElement => {
  const classes = useStyles();

  // Share dialog boolean
  const [open, setOpen] = React.useState<boolean>(false);

  // Toggle share dialog open/closed
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  // Generic bullet point div
  const bulletPoint = <span className={classes.bullet}>•</span>;

  // Convert idea created_at timestamp to Date object
  const convertedDate: Date = new Date(idea.date);

  return (
    <Card raised={true} className={classes.card}>
      <CardContent>
        <div className={classes.header}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <Link className={classes.userLink} href={idea.owner.id}>
              @{idea.owner.username} {bulletPoint}{' '}
            </Link>
            {MONTHS[convertedDate.getUTCMonth()]} {convertedDate.getUTCDate()},{' '}
            {convertedDate.getUTCFullYear()}
          </Typography>
          <IconButton aria-label="Close" color="secondary" size="small">
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </div>
        <Typography className={classes.text}>{idea.text}</Typography>
        <Container className={classes.footer}>
          <Voters
            upvotes={idea.upvotes}
            downvotes={idea.downvotes}
            ideaKey={idea.key}
          />
          <Container className={classes.tags}>
            {idea.tags.map(
              (tag: string): React.ReactElement => {
                const uppercaseTag = `${tag[0].toUpperCase()}${tag.substring(
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
            <IconButton onClick={toggleOpen} color="inherit">
              <Forward fontSize="large" />
            </IconButton>
            <Dialog
              onClose={toggleOpen}
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
                        <FileCopyIcon fontSize="large" />
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

export default IdeaCard;