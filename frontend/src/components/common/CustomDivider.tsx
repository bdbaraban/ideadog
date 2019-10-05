import React, { FC } from 'react';

import Divider, { DividerProps } from '@material-ui/core/Divider';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

// CustomDivider component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      backgroundColor: theme.palette.secondary.main,
      margin: '0 auto',
      width: '100%'
    }
  })
);

// CustomDivider component prop types
type CustomDividerProps = Omit<DividerProps, 'variant'>;

/**
 * Custom styled Material-UI divider
 */
const StyledDivider: FC<CustomDividerProps> = ({
  classes,
  ...rest
}: CustomDividerProps) => {
  const { divider } = useStyles();

  return (
    <Divider
      variant="middle"
      classes={Object.assign({}, classes, { middle: divider })}
      {...rest}
    />
  );
};

export default StyledDivider;
