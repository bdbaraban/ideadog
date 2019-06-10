import React from 'react';
import Card from '@material-ui/core/Card';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  CardContent,
  Typography,
  Container,
  Icon,
  Dialog
} from '@material-ui/core';
import { Styles } from 'jss';
import { UserAuth } from '../../api';
import { LoginDialog } from '../';
import { Link } from 'react-navi';

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
        alignItems: 'center'
      },
      link: {
        textDecoration: 'none',
        color: theme.palette.common.white
      }
    })
);

interface UserCardProps {
  user: UserAuth;
}

const UserCard = ({ user }: UserCardProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  return (
    <Card raised={true} className={classes.card}>
      {user.currentUser ? (
        <CardContent className={classes.cardContent}>
          <Container className={classes.infoContainer}>
            <Container className={classes.infoLeft}>
              <Typography className={classes.infoTitle} color="textSecondary">
                @{user.currentUser.username}
              </Typography>
              <Typography color="textSecondary">Ideas:</Typography>
              <Typography color="textSecondary">Brightness:</Typography>
              <Typography color="textSecondary">Top Tag:</Typography>
            </Container>

            <Container className={classes.infoRight}>
              <div className={classes.infoPieces}>
                <Link
                  className={classes.link}
                  href={`/user/${user.currentUser.key}`}
                >
                  <Icon fontSize="small" color="inherit">
                    account_circle
                  </Icon>
                </Link>
                <div className={classes.infoRight}>
                  <Typography color="textSecondary">7</Typography>
                </div>
                <div className={classes.infoRight}>
                  <Typography color="textSecondary">
                    {Math.round(
                      (user.currentUser.upvotes /
                        (user.currentUser.upvotes +
                          user.currentUser.downvotes)) *
                        100
                    )}
                    %
                  </Typography>
                </div>
                <div className={classes.infoRight}>
                  <Typography color="textSecondary">Dogs</Typography>
                </div>
              </div>
            </Container>
          </Container>
        </CardContent>
      ) : (
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
            <Dialog open={open} onClose={toggleOpen}>
              <LoginDialog user={user} toggleOpen={toggleOpen} />
            </Dialog>
          </Container>
        </CardContent>
      )}
    </Card>
  );
};

export default UserCard;
