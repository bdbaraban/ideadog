import React from 'react';
import { Link } from 'react-navi';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  SvgIcon
} from '@material-ui/core';
import { Styles } from 'jss';
import { HappyTully } from '../../icons';

/**
 * Title component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center'
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          display: 'block'
        }
      },
      link: {
        textDecoration: 'none',
        color: theme.palette.common.white
      }
    })
);

/**
 * Site title component
 */
const IdeaDogTitle = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href="/home">
        <SvgIcon component={(): React.ReactElement => HappyTully(46)}>
          &nbsp;
        </SvgIcon>
      </Link>
      <Typography className={classes.title} variant="h5" color="inherit" noWrap>
        <Link href="/home" className={classes.link}>
          IdeaDog
        </Link>
      </Typography>
    </div>
  );
};

export default React.memo(IdeaDogTitle);
