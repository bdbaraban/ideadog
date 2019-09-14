import React, {
  Dispatch,
  MouseEvent,
  ReactElement,
  SetStateAction,
  useState
} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import Lightbulb from 'mdi-material-ui/Lightbulb';
import LightbulbOutline from 'mdi-material-ui/LightbulbOutline';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Share from 'mdi-material-ui/Share';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { fetchIdeas } from 'store/ideas/actions';
import { UserState } from 'store/user/types';
import { ClipboardCopy, Link } from 'components';
import { Idea } from 'types';
import { formatLongDate, formatTag } from 'utils';

// IdeaCard component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.common.white,
      [theme.breakpoints.down('xs')]: {
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
      }
    },
    subheaderTypographyProps: {
      color: fade(theme.palette.common.white, 0.5)
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      paddingBottom: 16,
      borderBottom: `1px solid ${fade(theme.palette.common.white, 0.5)}`
    },
    cardActions: {
      justifyContent: 'space-between'
    },
    cardActionsLeft: {
      display: 'flex'
    },
    upvote: {
      paddingRight: theme.spacing(1)
    },
    downvote: {
      paddingRight: theme.spacing(1),
      transform: 'rotate(180deg)'
    },
    lightbulbUpvoted: {
      fill: theme.palette.secondary.main
    },
    lightbulbDownvoted: {
      fill: theme.palette.error.main
    },
    userLink: {
      color: theme.palette.common.white,
      textDecoration: 'none',
      textTransform: 'none'
    },
    tag: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      color: theme.palette.common.white,
      margin: 2
    },
    tags: {
      marginTop: theme.spacing(1)
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
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    shareDialogContent: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: theme.spacing(1),
      paddingTop: 0,
      width: '100%'
    },
    link: {
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.secondary.dark
      }
    },
    popper: {
      alignItems: 'center',
      display: 'flex',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(2)
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main
    }
  })
);

// IdeaCard component prop types
interface IdeaCardProps {
  idea: Idea;
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Card for displaying an idea
 */
const IdeaCard = ({ idea, setSnackbarOpen }: IdeaCardProps): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select user from Redux store
  const user = useSelector((state: AppState): UserState => state.user);

  // Share dialog boolean
  const [open, setOpen] = useState<boolean>(false);

  // Delete popup anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Boolean version of anchor
  const deleteOpen = Boolean(anchorEl);

  // User voted on idea boolean
  const [voted, setVoted] = useState<boolean>(
    user.profile.votes && user.profile.votes[idea.key] === 'upvote'
      ? true
      : false
  );

  // Sumit user vote
  const toggleVote = (): void => {
    if (!voted) {
      fetch(`${process.env.IDEADOG_API}/idea/${idea.key}/upvote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.bearer}`
        }
      });
      setVoted(true);
    } else {
      fetch(`${process.env.IDEADOG_API}/idea/${idea.key}/downvote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.bearer}`
        }
      });
      setVoted(false);
    }
  };

  // Delete idea
  const handleDelete = async (): Promise<void> => {
    // Delete idea
    await fetch(`${process.env.IDEADOG_API}/idea/${idea.key}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.bearer}`
      }
    });

    // Update ideas
    await dispatch(fetchIdeas());

    // Flash idea posted snackbar
    setSnackbarOpen(true);
    setTimeout((): void => {
      setSnackbarOpen(false);
    }, 5000);
  };

  // Toggle delete popper
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Close search popover menu for mobile
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Toggle share dialog open/closed
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  return (
    <Card raised={true} className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {idea.owner.username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Link
            href="/user/[key]"
            as={`/user/${idea.owner.id}`}
            className={classes.userLink}
          >
            {`@${idea.owner.username}`}
          </Link>
        }
        subheader={formatLongDate(new Date(idea.date))}
        subheaderTypographyProps={{
          className: classes.subheaderTypographyProps
        }}
        action={
          idea.owner.id === user.profile.key && (
            <IconButton
              aria-label="delete-idea"
              color="secondary"
              onClick={handleClick}
            >
              <CloseIcon />
            </IconButton>
          )
        }
      />
      {idea.owner.id === user.profile.key && (
        <Popover
          id="delete-idea-popper"
          open={deleteOpen}
          onClose={handleClose}
          anchorEl={anchorEl}
        >
          <Paper className={classes.popper}>
            <Typography color="textSecondary" variant="body1">
              Delete this idea?
            </Typography>
            <div>
              <Button color="secondary" size="large" onClick={handleDelete}>
                <Typography>Yes</Typography>
              </Button>
              <Button color="secondary" size="large" onClick={handleClose}>
                <Typography>No</Typography>
              </Button>
            </div>
          </Paper>
        </Popover>
      )}
      <Divider />
      <CardContent>
        <Typography>{idea.text}</Typography>
        <Box className={classes.tags}>
          {idea.tags.map(
            (tag: string): ReactElement => (
              <Chip key={tag} label={formatTag(tag)} className={classes.tag} />
            )
          )}
        </Box>
      </CardContent>
      <Divider />
      <CardActions className={classes.cardActions}>
        <Box className={classes.cardActionsLeft}>
          <Box className={classes.upvote}>
            <IconButton color="inherit" onClick={toggleVote}>
              {voted ? (
                <Lightbulb className={classes.lightbulbUpvoted} />
              ) : (
                <LightbulbOutline />
              )}
            </IconButton>
          </Box>
        </Box>
        <IconButton onClick={toggleOpen} color="inherit">
          <Share fontSize="large" />
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
            SHARE THIS GREAT IDEA
            <DialogContent className={classes.shareDialogContent}>
              <Link href={`/idea/${idea.key}`} className={classes.link}>
                {`${process.env.IDEADOG_DOMAIN}/idea/${idea.key}`}
              </Link>
              <ClipboardCopy
                TooltipProps={{ title: 'Copied', leaveDelay: 1000 }}
              >
                {({ copy }): ReactElement => (
                  <IconButton
                    color="inherit"
                    onClick={(): void =>
                      copy(`${process.env.IDEADOG_DOMAIN}/idea/${idea.key}`)
                    }
                  >
                    <FileCopyIcon fontSize="large" />
                  </IconButton>
                )}
              </ClipboardCopy>
            </DialogContent>
          </DialogTitle>
        </Dialog>
      </CardActions>
    </Card>
  );
};

export default IdeaCard;
