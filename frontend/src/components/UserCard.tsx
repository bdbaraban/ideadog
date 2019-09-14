import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { UserState } from 'store/user/types';
import { formatShortDate } from 'utils';

// UserCard component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: '#4f5982',
      color: theme.palette.common.white
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

/**
 * User card component displayed at top of InfoGrid
 */
const UserCard = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select Next router
  const router = useRouter();

  // Select logged in user from Redux store
  const user = useSelector((state: AppState): UserState => state.user);

  // Redirect to user page
  const redirectToUser = (): void => {
    router.push(`/user/${user.profile.key}`);
  };

  // Log user out
  const logout = (): void => {
    router.push(`/logout`);
  };

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {user.profile.username[0].toUpperCase()}
          </Avatar>
        }
        title={`@${user.profile.username}`}
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
              {user.profile.ideas.length || 0}
            </Typography>
            <Typography color="textSecondary">88%</Typography>
            <Typography color="textSecondary">
              {user.profile.favorite || 'N/A'}
            </Typography>
            <Typography color="textSecondary">
              {formatShortDate(new Date(user.profile.created_at))}
            </Typography>
          </Container>
        </Container>
      </CardContent>
      <Divider />
      <CardActions className={classes.cardActions}>
        {router.pathname !== 'user' && (
          <Button
            size="small"
            className={classes.button}
            onClick={redirectToUser}
          >
            View Profile
          </Button>
        )}
        <Button size="small" className={classes.button} onClick={logout}>
          Log Out
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
