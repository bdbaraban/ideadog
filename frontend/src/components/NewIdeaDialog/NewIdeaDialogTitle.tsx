import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import { HappyTully, SadTully } from 'components/common';

// NewIdeaDialog component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      alignItems: 'center',
      backgroundColor: theme.palette.primary.light,
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
      width: '100%'
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      margin: 0
    },
    closeButton: {
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.25)
      }
    },
    closeIcon: {
      margin: theme.spacing(0.5)
    },
    logo: {
      display: 'flex',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    postButton: {
      fontWeight: 'bold'
    }
  })
);

// NewIdeaDialogTitle component prop types
interface NewIdeaDialogTitleProps {
  handleClose: VoidFunction;
  handlePost: () => Promise<void>;
  characterCount: number;
  textError: boolean;
  postError: boolean;
}

/**
 * Header post and close button container for NewIdeaDialog
 */
const NewIdeaDialogTitle: FC<NewIdeaDialogTitleProps> = ({
  handleClose,
  handlePost,
  characterCount,
  textError,
  postError
}: NewIdeaDialogTitleProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <DialogTitle className={classes.title} disableTypography>
      {/* Close button */}
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        color="secondary"
        onClick={handleClose}
        size="small"
      >
        <CloseIcon className={classes.closeIcon} />
      </IconButton>

      {/* Character count and happy/sad logo tracking errors */}
      <Box className={classes.right}>
        <Typography color={textError ? 'error' : 'textSecondary'}>
          {characterCount}
        </Typography>
        <Box className={classes.logo}>
          {postError ? (
            <SadTully size={36} id="NewIdeaDialogTitleSad" />
          ) : (
            <HappyTully size={36} id="NewIdeaDialogTitleHappy" />
          )}
        </Box>

        {/* Post button */}
        <Button
          aria-label="post"
          className={classes.postButton}
          color="secondary"
          variant="contained"
          disabled={postError}
          onClick={handlePost}
        >
          Post
        </Button>
      </Box>
    </DialogTitle>
  );
};

export default NewIdeaDialogTitle;
