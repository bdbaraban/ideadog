import React, { FC } from 'react';

import Card, { CardProps } from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// GridCard component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.common.white,
      [theme.breakpoints.down('xs')]: {
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
      }
    }
  })
);

// GridCard component prop types
type GridCardProps = Omit<CardProps, 'elevation'>;

/**
 * Custom styled light blue card
 */
const GridCard: FC<GridCardProps> = ({
  className,
  children,
  ...rest
}: GridCardProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Card raised={true} className={clsx(className, classes.card)} {...rest}>
      {children}
    </Card>
  );
};

export default GridCard;
