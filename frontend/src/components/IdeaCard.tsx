import React, { ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import CommentIcon from '@material-ui/icons/Comment';
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
import { ClipboardCopy, Link } from 'components';
import { Idea } from 'types';
import { calculateBrightness, formatDate, formatTag, getHostname } from 'utils';

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
    brightness: {
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      paddingRight: theme.spacing(1)
    },
    lightbulb: {
      fill: theme.palette.secondary.main
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
}

/**
 * Card for displaying an idea
 */
const IdeaCard = ({ idea }: IdeaCardProps): ReactElement => {
  const classes = useStyles();

  // Share dialog boolean
  const [open, setOpen] = React.useState<boolean>(false);
  // Delete popup anchor
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // Boolean version of anchor
  const deleteOpen = Boolean(anchorEl);
  // User voted on idea boolean
  const [voted, setVoted] = React.useState<boolean>(false);

  const toggleVote = (): void => {
    setVoted(!voted);
  };

  // Toggle delete popper
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
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
          <Link href={`/user/${idea.owner.id}`} className={classes.userLink}>
            {`@${idea.owner.username}`}
          </Link>
        }
        subheader={formatDate(new Date(idea.date))}
        subheaderTypographyProps={{
          className: classes.subheaderTypographyProps
        }}
        action={
          <IconButton
            aria-label="close"
            color="secondary"
            onClick={handleClick}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <Popover
        id="delete-popper"
        open={deleteOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <Paper className={classes.popper}>
          <Typography color="textSecondary" variant="body1">
            Delete this idea?
          </Typography>
          <div>
            <Button color="secondary" size="large">
              <Typography>Yes</Typography>
            </Button>
            <Button color="secondary" size="large" onClick={handleClose}>
              <Typography>No</Typography>
            </Button>
          </div>
        </Paper>
      </Popover>
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
          <Box className={classes.brightness}>
            <IconButton color="inherit" onClick={toggleVote}>
              {voted ? (
                <Lightbulb className={classes.lightbulb} />
              ) : (
                <LightbulbOutline />
              )}
            </IconButton>
            {`${calculateBrightness(idea.upvotes, idea.downvotes)}%`}
          </Box>
          <Box>
            <IconButton color="inherit">
              <CommentIcon />
            </IconButton>
            32
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
            Share this great idea.
            <DialogContent className={classes.shareDialogContent}>
              <Link href={`/idea/${idea.key}`} className={classes.link}>
                {`${getHostname()}/idea/${idea.key}`}
              </Link>
              <ClipboardCopy
                TooltipProps={{ title: 'Copied', leaveDelay: 1000 }}
              >
                {({ copy }): ReactElement => (
                  <IconButton
                    color="inherit"
                    onClick={(): void =>
                      copy(`${getHostname()}/idea/${idea.key}`)
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
