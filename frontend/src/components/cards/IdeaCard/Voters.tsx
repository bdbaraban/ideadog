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
        minHeight: 85
      },
      label: {
        position: 'absolute'
      },
      sad: {
        [theme.breakpoints.down('xs')]: {
          display: 'flex',
          alignSelf: 'flex-end'
        }
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
  // Idea upvote count
  upvotes: number;

  // Idea downvote count
  downvotes: number;

  // Unique idea key
  ideaKey: string;
}

const Voters = ({
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
      up: upvotes ? upvotes : 1,
      down: downvotes ? downvotes : 1
    });
    setVoteStatus({
      upvoted: false,
      downvoted: false
    });

    // Return update function
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
  };

  // Calculate opacity of SVG logos based on upvotes/downvotes
  const calculateOpacity = (type: string): number => {
    if (type === 'up') {
      return votes.up / (votes.up + votes.down) < 0.05
        ? 0.05
        : votes.up / (votes.up + votes.down);
    }
    return votes.down / (votes.up + votes.down) < 0.05
      ? 0.05
      : votes.down / (votes.up + votes.down);
  };

  return (
    <div className={classes.root}>
      <Button
        classes={{
          label: classes.label
        }}
        onClick={handleUpvoteClick}
        disabled={voteStatus.upvoted}
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
        className={classes.sad}
        classes={{
          label: classes.label
        }}
        onClick={handleDownvoteClick}
        disabled={voteStatus.downvoted}
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
