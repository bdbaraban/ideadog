import React, { FC, ReactNode } from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

// CustomExpansionPanel component styles
const useStyles = makeStyles(() =>
  createStyles({
    expansionPanel: {
      borderRadius: 4,
      backgroundColor: '#4f5982',
      marginTop: 5,
      width: '100%'
    },
    heading: {
      fontWeight: 'bold'
    }
  })
);

// Custom Material UI expansion panel
const ExpansionPanel = withStyles({
  root: {
    '&:before': {
      backgroundColor: 'transparent'
    }
  }
})(MuiExpansionPanel);

// CustomExpansionPanel component prop types
interface CustomExpansionPanelProps {
  title: string;
  label: string;
  children: ReactNode;
}

/**
 * Custom styled Material-UI expansion panel
 */
const CustomExpansionPanel: FC<CustomExpansionPanelProps> = ({
  title,
  label,
  children
}: CustomExpansionPanelProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <ExpansionPanel className={classes.expansionPanel}>
      <ExpansionPanelSummary
        aria-controls={`${label}-content`}
        id={`${label}-header`}
        expandIcon={<ExpandMoreIcon color="secondary" />}
      >
        <div>
          <Typography
            className={classes.heading}
            color="textSecondary"
            variant="subtitle1"
          >
            {title}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography color="textSecondary" variant="body1">
          {children}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default CustomExpansionPanel;
