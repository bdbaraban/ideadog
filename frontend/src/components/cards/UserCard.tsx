import React from 'react';
import Card from '@material-ui/core/Card';
import {
  Button,
  CardContent,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { UserSession } from '../../api';
import { MONTHS } from '../../constants';
import { LoginDialog } from '../';

/**
 * UserCard component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      },
      cardContent: {
        '&:last-child': {
          paddingBottom: 16
        }
      },
      loginButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      loginButton: {
        fontWeight: 'bold'
      },
      infoTitle: {
        fontWeight: 'bold'
      },
      infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0
      },
      infoLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 0
      },
      infoRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 0
      },
      infoPieces: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      link: {
        textDecoration: 'none',
        color: theme.palette.common.white
      }
    })
);

/**
 * UserCard component prop types
 */
interface UserCardProps {
  // Current user session
  user: UserSession;
}

/**
 * User card component displayed at top of InfoGrid
 */
const UserCard = ({ user }: UserCardProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  // Convert User date of account creation timestamp to Date object
  const convertedDate: Date | null = user.current
    ? new Date(user.current.created_at)
    : null;

  // Calculate brightness based on User upvotes/downvotes
  const brightness: number | null = user.current
    ? Math.round(
        (user.current.upvotes /
          (user.current.upvotes + user.current.downvotes)) *
          100
      )
    : null;

  return (
    // User info, if user is logged in
    <Card raised={true} className={classes.card}>
      {user.current ? (
        <CardContent className={classes.cardContent}>
          <Container className={classes.infoContainer}>
            <Container className={classes.infoLeft}>
              <Typography className={classes.infoTitle} color="textSecondary">
                @{user.current.username}
              </Typography>
              <Typography color="textSecondary">Ideas:</Typography>
              <Typography color="textSecondary">Brightness:</Typography>
              <Typography color="textSecondary">Favorite tag:</Typography>
              {convertedDate && (
                <Typography color="textSecondary">Member since:</Typography>
              )}
            </Container>

            <Container className={classes.infoRight}>
              <div className={classes.infoPieces}>
                <div className={classes.infoRight}>&nbsp;</div>
                <div className={classes.infoRight}>
                  <Typography color="textSecondary">7</Typography>
                </div>
                <div className={classes.infoRight}>
                  <Typography color="textSecondary">{brightness}%</Typography>
                </div>
                {convertedDate && (
                  <div className={classes.infoRight}>
                    <Typography color="textSecondary">
                      {user.current.favorite}
                    </Typography>
                    <Typography color="textSecondary">
                      {MONTHS[convertedDate.getUTCMonth()]}{' '}
                      {convertedDate.getUTCDate()},{' '}
                      {convertedDate.getUTCFullYear()}
                    </Typography>
                  </div>
                )}
              </div>
            </Container>
          </Container>
        </CardContent>
      ) : (
        // Login button, if user is not logged in
        <CardContent className={classes.cardContent}>
          <Container className={classes.loginButtonContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.loginButton}
              onClick={toggleOpen}
            >
              Log In/Sign Up
            </Button>
            <LoginDialog user={user} open={open} toggleSelfOpen={toggleOpen} />
          </Container>
        </CardContent>
      )}
    </Card>
  );
};

export default React.memo(UserCard);
