import React, { FC } from 'react';

import Avatar from '@material-ui/core/Avatar';
import CardHeader, { CardHeaderProps } from '@material-ui/core/CardHeader';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import { Link } from 'components/common';

// CustomCardHeader component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleTypographyProps: {
      fontWeight: 'bold'
    },
    subheaderTypographyPropsWhite: {
      color: theme.palette.common.white
    },
    subheaderTypographyPropsBlue: {
      color: fade(theme.palette.common.white, 0.5)
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main
    },
    link: {
      color: theme.palette.common.white,
      textDecoration: 'none',
      textTransform: 'none'
    }
  })
);

// CustomCardHeader component prop types
interface CustomCardHeaderProps
  extends Omit<
    CardHeaderProps,
    'avatar' & 'title' & 'titleTypographyProps' & 'subheaderTypographyProps'
  > {
  username: string;
  userKey: string;
  subheaderColor: 'white' | 'blue';
}

/**
 * Custom styled avatar and username header
 */
const CustomCardHeader: FC<CustomCardHeaderProps> = ({
  username,
  userKey,
  subheaderColor,
  ...rest
}: CustomCardHeaderProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <CardHeader
      avatar={
        <Avatar className={classes.avatar}>{username[0].toUpperCase()}</Avatar>
      }
      title={
        <Link
          href="/user/[key]"
          as={`/user/${userKey}`}
          className={classes.link}
        >
          {`@${username}`}
        </Link>
      }
      titleTypographyProps={{
        className: classes.titleTypographyProps,
        variant: 'subtitle1'
      }}
      subheaderTypographyProps={{
        className:
          subheaderColor === 'white'
            ? classes.subheaderTypographyPropsWhite
            : classes.subheaderTypographyPropsBlue
      }}
      {...rest}
    />
  );
};

export default CustomCardHeader;
