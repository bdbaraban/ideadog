import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { NewIdeaState } from 'store/newIdea/types';
import { setOpen } from 'store/newIdea/actions';

// NewIdeaCard component style
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
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
    }
  })
);

/**
 * Card that opens dialog for posting new ideas
 * Displayed at top of IdeaFeed
 */
const NewIdeaCard = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();

  // Select new idea state from Redux store
  const newIdea = useSelector((state: AppState): NewIdeaState => state.newIdea);

  // Toggle new idea dialog open/closed
  const toggleOpen = (): void => {
    dispatch(setOpen(!newIdea.open));
  };

  return (
    <Card raised={true} className={classes.card}>
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
    </Card>
  );
};

export default NewIdeaCard;
