import React, { FC } from 'react';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import { GridCard } from 'components/common';

import { useThunkDispatch } from 'store';
import { setOpen } from 'store/newIdea';

// NewIdeaCard component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      '&:last-child': {
        paddingBottom: 16
      }
    },
    cardButton: {
      boxShadow: 'none',
      textTransform: 'none',
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        boxShadow: 'none'
      }
    }
  })
);

/**
 * Card that opens dialog for posting new ideas
 * Displayed at top of IdeaFeed
 */
const NewIdeaCard: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select Redux dispatcher
  const dispatch = useThunkDispatch();

  // Toggle new idea dialog open/closed
  const toggleOpen = (): void => {
    dispatch(setOpen());
  };

  return (
    <GridCard>
      <CardContent className={classes.cardContent}>
        <Button
          variant="contained"
          color="primary"
          className={classes.cardButton}
          onClick={toggleOpen}
        >
          I&apos;ve got a bright new idea...
          <Icon fontSize="small">edit</Icon>
        </Button>
      </CardContent>
    </GridCard>
  );
};

export default NewIdeaCard;
