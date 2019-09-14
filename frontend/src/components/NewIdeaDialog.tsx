import React, {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  SyntheticEvent,
  useState
} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { CustomTextField, HappyTully, SadTully, TagsInput } from 'components';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { fetchIdeas } from 'store/ideas/actions';
import { fetchTags } from 'store/tags/actions';
import { UserState } from 'store/user/types';
import { NewIdeaState } from 'store/newIdea/types';
import { setOpen } from 'store/newIdea/actions';
import fetch from 'isomorphic-unfetch';

// NewIdeaDialog component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperProps: {
      height: 'min-content',
      maxWidth: 540,
      width: 'calc(100% - 96px)',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
        maxWidth: 'none',
        minWidth: '100vw'
      }
    },
    title: {
      alignItems: 'center',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
      width: '100%'
    },
    titleRight: {
      display: 'flex',
      alignItems: 'center',
      margin: 0
    },
    tully: {
      display: 'flex',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    closeButton: {
      '&:hover': {
        backgroundColor: fade(theme.palette.secondary.main, 0.25)
      }
    },
    closeIcon: {
      margin: theme.spacing(0.5)
    },
    postButton: {
      fontWeight: 'bold'
    },
    content: {
      padding: theme.spacing(2),
      width: '100%'
    },
    tagsInput: {
      display: 'flex',
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      width: '60%',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    snackbarContent: {
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.main,
      display: 'flex',
      fontWeight: 'bold',
      justifyContent: 'center'
    }
  })
);

// Selected Redux state
interface SelectedState {
  newIdea: NewIdeaState;
  user: UserState;
}

/**
 * Input dialog for posting new ideas
 */
const NewIdeaDialog = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select new idea state from Redux store
  const { newIdea, user } = useSelector(
    (state: AppState): SelectedState => ({
      newIdea: state.newIdea,
      user: state.user
    })
  );

  // Idea text
  const [text, setText] = useState<string>('');

  // Idea tags
  const [tags, setTags] = useState<string[]>([]);

  // Snackbar open/closed status
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Toggle dialog open/closed
  const toggleOpen = (): void => {
    dispatch(setOpen(!newIdea.open));
  };

  // Close idea posted snackbar
  const handleClose = (
    _: SyntheticEvent | MouseEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  // Save latest idea text
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  // Post idea and refresh page
  const handlePost = async (): Promise<void> => {
    // Post idea
    await fetch(`${process.env.IDEADOG_API}/idea`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.bearer
      },
      body: JSON.stringify({
        text,
        owner_id: user.profile.id,
        tags
      })
    });

    // Update ideas
    await dispatch(fetchIdeas());

    // Update tags
    dispatch(fetchTags());

    // Close dialog
    dispatch(setOpen(false));

    // Clear idea input
    setText('');
    setTags([]);

    // Flash idea posted snackbar
    setSnackbarOpen(true);
    setTimeout((): void => {
      setSnackbarOpen(false);
    }, 5000);
  };

  const textError = text.length === 0;
  const tagsError = tags.length > 5;
  const postError = textError || tagsError;

  return (
    <>
      <Dialog
        onClose={toggleOpen}
        aria-labelledby="new-idea-dialog"
        open={newIdea.open}
        PaperProps={{
          className: classes.paperProps
        }}
      >
        <DialogTitle className={classes.title} disableTypography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            color="secondary"
            onClick={toggleOpen}
            size="small"
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
          <Box className={classes.titleRight}>
            <Typography color={textError ? 'error' : 'textSecondary'}>
              {text.length}
            </Typography>
            <Box className={classes.tully}>
              <SvgIcon
                component={(): ReactElement =>
                  postError
                    ? SadTully(36, 'NewIdeaDialogSad')
                    : HappyTully(36, 'NewIdeaDialogHappy')
                }
              >
                &nbsp;
              </SvgIcon>
            </Box>
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
        <DialogContent className={classes.content}>
          <CustomTextField
            id="new-idea-text-field"
            value={text}
            onChange={handleTextChange}
            variant="filled"
            fullWidth={true}
            label="I've got a bright new idea..."
            margin="none"
            multiline
            placeholder="A dog hotel, for humans."
          />
          <Box className={classes.tagsInput}>
            <TagsInput tags={tags} setTags={setTags} />
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarOpen}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'idea-posted-message',
          className: classes.snackbarContent
        }}
        message={
          <span id="idea-posted-message">
            Idea posted!
            <span role="img" aria-label="raising-hands">
              🙌
            </span>
          </span>
        }
      />
    </>
  );
};

export default NewIdeaDialog;
