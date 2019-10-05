import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Lightbulb from 'mdi-material-ui/Lightbulb';
import LightbulbOutline from 'mdi-material-ui/LightbulbOutline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// VoteIconButton component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      alignItems: 'center',
      display: 'flex'
    },
    upvoted: {
      fill: theme.palette.secondary.main
    }
  })
);

// VoteIconButton component prop types
interface VoteIconButtonProps {
  toggleVote: VoidFunction;
  voted: boolean;
}

/**
 * Lightbulb icon button to toggle vote on idea
 */
const VoteIconButton: FC<VoteIconButtonProps> = ({
  toggleVote,
  voted
}: VoteIconButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <IconButton color="inherit" onClick={toggleVote}>
        {voted ? (
          <Lightbulb className={classes.upvoted} />
        ) : (
          <LightbulbOutline />
        )}
      </IconButton>
    </Box>
  );
};

export default VoteIconButton;
