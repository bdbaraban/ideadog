import React, { ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { User } from 'types';
import { formatShortDate } from 'utils';

// UserGridCard component styles
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
    titleTypographyProps: {
      fontWeight: 'bold'
    },
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    },
    infoTitle: {
      fontWeight: 'bold'
    },
    information: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 0,
      paddingRight: 0
    },
    informationLeft: {
      paddingLeft: 0,
      paddingRight: 0
    },
    informationRight: {
      paddingLeft: 0,
      paddingRight: 0,
      textAlign: 'right'
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main
    },
    button: {
      color: theme.palette.common.white
    }
  })
);

// UserGridCard component prop types
interface UserGridCardProps {
  user: User; // Current viewing user
}

/**
 * User card component displayed for UserIdeasGrid
 */
const UserGridCard = ({ user }: UserGridCardProps): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {user.username[0].toUpperCase()}
          </Avatar>
        }
        title={`@${user.username}`}
        titleTypographyProps={{
          className: classes.titleTypographyProps,
          variant: 'subtitle1'
        }}
      />
      <Divider />
      <CardContent>
        <Container className={classes.information}>
          <Container className={classes.informationLeft}>
            <Typography color="textSecondary">Ideas:</Typography>
            <Typography color="textSecondary">Brightness:</Typography>
            <Typography color="textSecondary">Favorite tag:</Typography>
            <Typography color="textSecondary">Member since:</Typography>
          </Container>

          <Container className={classes.informationRight}>
            <Typography color="textSecondary">
              {user.ideas.length || 0}
            </Typography>
            <Typography color="textSecondary">88%</Typography>
            <Typography color="textSecondary">
              {user.favorite || 'N/A'}
            </Typography>
            <Typography color="textSecondary">
              {formatShortDate(new Date(user.created_at))}
            </Typography>
          </Container>
        </Container>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default UserGridCard;
