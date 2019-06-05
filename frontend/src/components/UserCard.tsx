import React from 'react';
import Card from '@material-ui/core/Card';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  CardContent,
  Typography,
  Container
} from '@material-ui/core';
import { Styles } from 'jss';
import useUserStatus from '../api/useUserStatus';

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
        flexDirection: 'column',
        padding: 0
      },
      infoLine: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0
      }
    })
);

const UserCard = (): React.ReactElement => {
  const classes = useStyles();
  const [isOnline, setIsOnline] = React.useState<boolean>(useUserStatus());

  const handleLogin = (): void => {
    setIsOnline(true);
  };

  return (
    <Card raised={true} className={classes.card}>
      {isOnline ? (
        <CardContent className={classes.cardContent}>
          <Typography className={classes.infoTitle} color="textSecondary">
            @bdov_
          </Typography>
          <Container className={classes.infoContainer}>
            <Container className={classes.infoLine}>
              <Typography color="textSecondary">Ideas:</Typography>
              <Typography color="textSecondary">7</Typography>
            </Container>
            <Container className={classes.infoLine}>
              <Typography color="textSecondary">Brightness:</Typography>
              <Typography color="textSecondary">87%</Typography>
            </Container>
            <Container className={classes.infoLine}>
              <Typography color="textSecondary">Top Tag:</Typography>
              <Typography color="textSecondary">Dogs</Typography>
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
              onClick={handleLogin}
            >
              Log In/Sign Up
            </Button>
          </Container>
        </CardContent>
      )}
    </Card>
  );
};

export default UserCard;
