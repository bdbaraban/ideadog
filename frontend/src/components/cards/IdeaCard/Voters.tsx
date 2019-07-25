import React from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  SvgIcon
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { Styles } from 'jss';
import {
  HappyTully,
  BrightHappyTully,
  SadTully,
  BrightSadTully
} from '../../../icons';
import { downvoteIdea, upvoteIdea, UserSession } from '../../../api';

/**
 * Voters component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        borderRight: `1px solid ${fade(theme.palette.common.white, 0.5)}`,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '30%',
        [theme.breakpoints.down('md')]: {
          minHeight: 124
        }
      },
      label: {
        position: 'absolute'
      }
    })
);

/**
 * Votes state type
 */
interface VotesState {
  // Idea upvotes count
  up: number;
  // Idea downvotes count
  down: number;
}

/**
 * Vote status state type
 */
interface VoteStatusState {
  // User upvoted true/false
  upvoted: boolean;
  // User downvoted true/false
  downvoted: boolean;
}

/**
 * Voters component prop types
 */
interface VotersProps {
  // Current user session
  user: UserSession;
  // Idea upvote count
  upvotes: number;
  // Idea downvote count
  downvotes: number;
  // Unique idea key
  ideaKey: string;
}

const Voters = ({
  user,
  upvotes,
  downvotes,
  ideaKey
}: VotersProps): React.ReactElement => {
  const classes = useStyles();

  // Dynamically re-render upvotes/downvotes using state
  const [votes, setVotes] = React.useState<VotesState>({
    up: 1,
    down: 1
  });

  const [voteStatus, setVoteStatus] = React.useState<VoteStatusState>({
    upvoted: false,
    downvoted: false
  });

  React.useEffect((): void => {
    setVotes({
      up: upvotes !== undefined ? upvotes : 1,
      down: downvotes !== undefined ? downvotes : 1
    });
    setVoteStatus({
      upvoted:
        user.current &&
        user.current.votes &&
        user.current.votes[ideaKey] === 'upvote'
          ? true
          : false,
      downvoted:
        user.current &&
        user.current.votes &&
        user.current.votes[ideaKey] === 'downvote'
          ? true
          : false
    });
  }, [ideaKey]);

  const handleUpvoteClick = (): void => {
    setVotes({
      up: upvotes + 1,
      down: downvotes
    });
    setVoteStatus({
      upvoted: true,
      downvoted: false
    });

    upvoteIdea(ideaKey, user.bearer);
  };

  const handleDownvoteClick = (): void => {
    setVotes({
      up: upvotes,
      down: downvotes + 1
    });
    setVoteStatus({
      upvoted: false,
      downvoted: true
    });
    downvoteIdea(ideaKey, user.bearer);
  };

  // Calculate opacity of SVG logos based on upvotes/downvotes
  const calculateOpacity = (type: string): number => {
    if (type === 'up') {
      return votes.up / (votes.up + votes.down) < 0.1
        ? 0.1
        : votes.up / (votes.up + votes.down);
    }
    return votes.down / (votes.up + votes.down) < 0.1
      ? 0.1
      : votes.down / (votes.up + votes.down);
  };

  return (
    <div className={classes.root}>
      <Button
        classes={{
          label: classes.label
        }}
        onClick={handleUpvoteClick}
        disabled={voteStatus.upvoted || !user.current}
      >
        {voteStatus.upvoted ? (
          <SvgIcon
            component={(): React.ReactElement =>
              BrightHappyTully(62, calculateOpacity('up'))
            }
          >
            &nbsp;
          </SvgIcon>
        ) : (
          <SvgIcon
            component={(): React.ReactElement =>
              HappyTully(42, calculateOpacity('up'))
            }
          >
            &nbsp;
          </SvgIcon>
        )}
      </Button>
      <Button
        classes={{
          label: classes.label
        }}
        onClick={handleDownvoteClick}
        disabled={voteStatus.downvoted || !user.current}
      >
        {voteStatus.downvoted ? (
          <SvgIcon
            component={(): React.ReactElement =>
              BrightSadTully(62, calculateOpacity('down'))
            }
          >
            &nbsp;
          </SvgIcon>
        ) : (
          <SvgIcon
            component={(): React.ReactElement =>
              SadTully(42, calculateOpacity('down'))
            }
          >
            &nbsp;
          </SvgIcon>
        )}
      </Button>
    </div>
  );
};

export default Voters;
