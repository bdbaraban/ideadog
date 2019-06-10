import React from 'react';
import Card from '@material-ui/core/Card';
import {
  createStyles,
  makeStyles,
  Theme,
  CardContent,
  Typography,
  Button
} from '@material-ui/core';
import { Styles } from 'jss';
import { UserAuth } from 'api';
import { useNavigation } from 'react-navi';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      },
      content: {
        '&:last-child': {
          paddingBottom: 16
        }
      },
      title: {
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
          textAlign: 'center'
        }
      },
      options: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.down('sm')]: {
          alignItems: 'center'
        }
      },
      text: {
        textTransform: 'none'
      }
    })
);

interface SettingsCardProps {
  user: UserAuth;
}

const SettingsCard = ({ user }: SettingsCardProps): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();

  const handleLogOut = (): void => {
    user.logout();
    navigation.navigate('/home');
  };

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary">
          Settings
        </Typography>
        <div className={classes.options}>
          <Button onClick={handleLogOut}>
            <Typography className={classes.text} color="textSecondary">
              Log Out
            </Typography>
          </Button>
          <Button>
            <Typography className={classes.text} color="textSecondary">
              Delete Account
            </Typography>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
