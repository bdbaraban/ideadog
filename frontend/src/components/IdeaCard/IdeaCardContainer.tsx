import React, { FC, MouseEvent, ReactElement, useState } from 'react';

import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import DeletePopover from './DeletePopover';
import ShareIconButton from './ShareIconButton';
import VoteIconButton from './VoteIconButton';

import { CustomCardHeader, GridCard } from 'components/common';

import { useThunkDispatch } from 'store';
import { deleteIdea } from 'store/ideas';
import { useUserState } from 'hooks';

import { Idea } from 'types';
import { formatLongDate, formatTag } from 'utils';
import 'isomorphic-unfetch';

// IdeaCard component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardActions: {
      justifyContent: 'space-between'
    },
    tag: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      color: theme.palette.common.white,
      margin: 2
    },
    tags: {
      marginTop: theme.spacing(1)
    }
  })
);

// IdeaCard component prop types
interface IdeaCardContainerProps {
  idea: Idea;
}

/**
 * Wraps card displaying/controlling an idea
 */
const IdeaCardContainer: FC<IdeaCardContainerProps> = ({
  idea
}: IdeaCardContainerProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select user from Redux store
  const user = useUserState();

  // Share dialog boolean
  const [open, setOpen] = useState<boolean>(false);

  // Delete popup anchor
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
  const handleDelete = (): void => {
    dispatch(deleteIdea(idea.key, user.bearer));
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
    <GridCard>
      <CustomCardHeader
        username={idea.owner.username}
        userKey={idea.owner.id}
        subheaderColor="blue"
        subheader={formatLongDate(new Date(idea.date))}
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
        <DeletePopover
          handleClose={handleClose}
          handleDelete={handleDelete}
          anchorEl={anchorEl}
        />
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
        <VoteIconButton voted={voted} toggleVote={toggleVote} />

        <ShareIconButton
          toggleOpen={toggleOpen}
          open={open}
          ideaKey={idea.key}
        />
      </CardActions>
    </GridCard>
  );
};

export default IdeaCardContainer;
