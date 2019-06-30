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
import { Link } from 'react-navi';
import { UserSession } from '../../api';
import { User } from '../../types';
import { MONTHS } from '../../constants';
import { AuthorizationDialog } from '../';

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
  // Current user page being viewed
  viewingUser: User | null;
}

/**
 * User card component displayed at top of InfoGrid
 */
const UserCard = ({ user, viewingUser }: UserCardProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const toggleOpen = (): void => {
    setOpen(!open);
  };

  const currentUser = viewingUser ? viewingUser : user.current;

  // Convert User date of account creation timestamp to Date object
  const convertedDate: Date | null = currentUser
    ? new Date(currentUser.created_at)
    : null;

  // Calculate brightness based on User upvotes/downvotes
  const brightness: number | null = currentUser
    ? Math.round(
        (currentUser.upvotes / (currentUser.upvotes + currentUser.downvotes)) *
          100
      )
    : null;

  return (
    // User info, if user is logged in
    <Card raised={true} className={classes.card}>
      {currentUser ? (
        <CardContent className={classes.cardContent}>
          <Container className={classes.infoContainer}>
            <Container className={classes.infoLeft}>
              <Typography className={classes.infoTitle} color="textSecondary">
                <Link
                  className={classes.link}
                  href={`/user/${currentUser.key}`}
                >
                  @{currentUser.username}
                </Link>
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
                  <Typography color="textSecondary">
                    {Object.keys(currentUser.ideas).length}
                  </Typography>
                </div>
                <div className={classes.infoRight}>
                  <Typography color="textSecondary">
                    {!brightness || isNaN(brightness)
                      ? 'N/A'
                      : `${brightness}%`}
                  </Typography>
                </div>
                {convertedDate && (
                  <div className={classes.infoRight}>
                    <Typography color="textSecondary">
                      {currentUser.favorite ? currentUser.favorite : 'N/A'}
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
            <AuthorizationDialog
              user={user}
              open={open}
              toggleGrandparentOpen={null}
              toggleParentOpen={toggleOpen}
            />
          </Container>
        </CardContent>
      )}
    </Card>
  );
};

export default UserCard;
