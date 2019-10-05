import React, { FC } from 'react';

import Card, { CardProps } from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// ApplicationBarCard component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: '#4f5982',
      color: theme.palette.common.white,
      width: '100%'
    }
  })
);

// ApplicationBarCard component prop types
type ApplicationBarCardProps = Omit<CardProps, 'elevation'>;

/**
 * Custom styled light blue card used in ApplicationBar
 */
const ApplicationBarCard: FC<ApplicationBarCardProps> = ({
  className,
  children,
  ...rest
}: ApplicationBarCardProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Card elevation={0} className={clsx(className, classes.card)} {...rest}>
      {children}
    </Card>
  );
};

export default ApplicationBarCard;
