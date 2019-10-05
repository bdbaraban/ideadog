import React, { ReactElement } from 'react';

import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// UserStatistics component styles
const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 0,
      paddingRight: 0
    },
    left: {
      paddingLeft: 0,
      paddingRight: 0
    },
    right: {
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: 'right'
    }
  })
);

// UserStatistics component prop types
interface UserStatisticsProps {
  ideas: number;
  upvotes: number;
  favorite: string;
}

/**
 * User statistics card content container
 */
const UserStatistics = ({
  ideas,
  upvotes,
  favorite
}: UserStatisticsProps): ReactElement => {
  // Select Material-UI Styles
  const classes = useStyles();

  return (
    <CardContent>
      <Container className={classes.container}>
        <Container className={classes.left}>
          <Typography color="textSecondary">Ideas:</Typography>
          <Typography color="textSecondary">Upvotes received:</Typography>
          <Typography color="textSecondary">Favorite tag:</Typography>
        </Container>

        <Container className={classes.right}>
          <Typography color="textSecondary">{ideas}</Typography>
          <Typography color="textSecondary">{upvotes}</Typography>
          <Typography color="textSecondary">{favorite}</Typography>
        </Container>
      </Container>
    </CardContent>
  );
};

export default UserStatistics;
