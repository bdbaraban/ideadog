import React from 'react';
import {
  Card,
  CardContent,
  createStyles,
  makeStyles,
  SvgIcon,
  Theme,
  Typography
} from '@material-ui/core';
import { SadTully } from '../icons';
import { Styles } from 'jss';
import { Link } from 'react-navi';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100vh'
      },
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      },
      cardContent: {
        '&:last-child': {
          paddingBottom: 16
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: theme.spacing(4)
      },
      text: {
        paddingBottom: theme.spacing(2)
      },
      link: {
        color: theme.palette.secondary.main,
        '&:hover': {
          color: theme.palette.secondary.dark
        },
        paddingTop: theme.spacing(2),
        fontSize: '1.8em'
      }
    })
);

interface ErrorPageProps {
  message: string;
}

const ErrorPage = ({ message }: ErrorPageProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.text}
            color="textSecondary"
            variant="h4"
          >
            404 - Not Found
          </Typography>
          <Typography
            className={classes.text}
            color="textSecondary"
            variant="subtitle1"
          >
            {message}
          </Typography>
          <SvgIcon component={(): React.ReactElement => SadTully(72)}>
            &nbsp;
          </SvgIcon>
          <Link href={'http://localhost:1234/home'} className={classes.link}>
            Return home.
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
