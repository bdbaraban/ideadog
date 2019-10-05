import React, { FC } from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

// IdeaCard component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popper: {
      alignItems: 'center',
      display: 'flex',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(2)
    }
  })
);

// DeletePopover component prop types
interface DeletePopoverProps {
  anchorEl: null | HTMLElement;
  handleClose: VoidFunction;
  handleDelete: VoidFunction;
}

/**
 * Popover controlling delete idea action
 */
const DeletePopover: FC<DeletePopoverProps> = ({
  anchorEl,
  handleClose,
  handleDelete
}: DeletePopoverProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Boolean version of anchor
  const deleteOpen = Boolean(anchorEl);

  return (
    <Popover
      id="delete-idea-popper"
      open={deleteOpen}
      onClose={handleClose}
      anchorEl={anchorEl}
    >
      <Paper className={classes.popper}>
        <Typography color="textSecondary" variant="body1">
          Delete this idea?
        </Typography>
        <div>
          <Button color="secondary" size="large" onClick={handleDelete}>
            <Typography>Yes</Typography>
          </Button>
          <Button color="secondary" size="large" onClick={handleClose}>
            <Typography>No</Typography>
          </Button>
        </div>
      </Paper>
    </Popover>
  );
};

export default DeletePopover;
