import React from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import {
  Button,
  CardContent,
  Checkbox,
  Chip,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  IconButton,
  makeStyles,
  MenuItem,
  ListItemText,
  SvgIcon,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import useUserStatus from '../../api/useUserStatus';
import HappyTully from '../../icons/HappyTully';
import SadTully from '../../icons/SadTully';
import NewIdeaTextField from './NewIdeaTextField';
import TagsSelect from './TagsSelect';
import TagsInputLabel from './TagsInputLabel';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      // Style of new idea card displayed on home screen
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      },
      cardContent: {
        '&:last-child': {
          paddingBottom: 16
        }
      },
      cardButton: {
        boxShadow: 'none',
        textTransform: 'none',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        }
      },

      // Style of login dialog
      loginDialogTitle: {
        color: theme.palette.common.white,
        textAlign: 'center'
      },
      loginDialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      loginDialogButton: {
        fontWeight: 'bold',
        marginTop: 8
      },

      // Style of new idea dialog
      newIdeaDialogTitle: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        padding: theme.spacing(1)
      },
      newIdeaDialogCloseButton: {
        '&:hover': {
          backgroundColor: fade(theme.palette.secondary.main, 0.25)
        }
      },
      newIdeaDialogCloseIcon: {
        margin: theme.spacing(0.5)
      },
      newIdeaDialogPostButton: {
        position: 'absolute',
        right: theme.spacing(1),
        fontWeight: 'bold'
      },
      newIdeaDialogContent: {
        padding: theme.spacing(2)
      },
      newIdeaDialogContentContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        padding: theme.spacing(2)
      },
      newIdeaFormControlContainer: {
        padding: 0,
        width: '80%'
      },
      newIdeaDialogFormControl: {
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(2),
        minWidth: 175,
        maxWidth: 275,
        width: 'max-content'
      },

      // Style of tag chips
      tagChips: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      tagChip: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        color: theme.palette.common.white,
        margin: 2
      },

      // Style of character count
      charCountContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '17.5px 0 0 0'
      },
      charCount: {
        display: 'flex',
        alignSelf: 'center',
        marginRight: theme.spacing(2)
      },
      charCountIcon: {
        marginTop: 24
      }
    })
);

const NewIdea = (props: { allTags: string[] }): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const [isOnline, setIsOnline] = React.useState<boolean>(useUserStatus());
  const [text, setText] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleLogin = (): void => {
    setIsOnline(true);
  };
  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setText(event.target.value);
  };
  const handleTagsChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    setTags(event.target.value as string[]);
  };

  const textError = text.length === 0 || text.length > 140;
  const tagsError = tags.length > 3;
  const postError = textError || tagsError;

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className={classes.cardButton}
        >
          I&apos;ve got a bright new idea...
          <Icon fontSize="small">edit</Icon>
        </Button>
        {isOnline ? (
          // New idea dialog, if user is logged in
          <Dialog
            onClose={handleClose}
            aria-labelledby="new-idea-dialog"
            open={open}
            fullWidth={true}
          >
            <DialogTitle className={classes.newIdeaDialogTitle}>
              <IconButton
                aria-label="Close"
                className={classes.newIdeaDialogCloseButton}
                color="secondary"
                onClick={handleClose}
                size="small"
              >
                <CloseIcon className={classes.newIdeaDialogCloseIcon} />
              </IconButton>
              <Button
                aria-label="Post"
                className={classes.newIdeaDialogPostButton}
                color="secondary"
                variant="contained"
                disabled={postError}
              >
                Post
              </Button>
            </DialogTitle>
            <DialogContent className={classes.newIdeaDialogContent}>
              <NewIdeaTextField
                value={text}
                error={text.length > 140}
                onChange={handleTextChange}
                variant="filled"
              />
              <Container className={classes.newIdeaDialogContentContainer}>
                <Container className={classes.newIdeaFormControlContainer}>
                  <FormControl
                    error={tags.length > 3}
                    className={classes.formControl}
                  >
                    <TagsInputLabel />
                    <TagsSelect
                      value={tags}
                      onChange={handleTagsChange}
                      renderValue={(selected: unknown): React.ReactElement => (
                        <div className={classes.tagChips}>
                          {(selected as string[]).map(
                            (value: string): React.ReactElement => (
                              <Chip
                                key={value}
                                label={value}
                                className={classes.tagChip}
                              />
                            )
                          )}
                        </div>
                      )}
                    >
                      {props.allTags.map(
                        (tag: string): React.ReactElement => (
                          <MenuItem key={tag} value={tag}>
                            <Checkbox
                              color="default"
                              checked={tags.indexOf(tag) > -1}
                            />
                            <ListItemText primary={tag} />
                          </MenuItem>
                        )
                      )}
                    </TagsSelect>
                  </FormControl>
                </Container>
                <Container className={classes.charCountContainer}>
                  <Typography
                    className={classes.charCount}
                    color={textError ? 'error' : 'textSecondary'}
                  >
                    {text.length} / 140
                  </Typography>
                  <SvgIcon
                    component={(): React.ReactElement =>
                      textError ? SadTully(36, 1) : HappyTully(36, 1)
                    }
                  >
                    &nbsp;
                  </SvgIcon>
                </Container>
              </Container>
            </DialogContent>
          </Dialog>
        ) : (
          // Login dialog, if user is not logged in
          <Dialog
            onClose={handleClose}
            aria-labelledby="new-idea-dialog"
            open={open}
          >
            <DialogTitle
              id="not-logged-in-dialog-title"
              className={classes.loginDialogTitle}
            >
              You must be logged in to post ideas.
              <DialogContent className={classes.loginDialogContent}>
                <SvgIcon component={(): React.ReactElement => SadTully(92, 1)}>
                  &nbsp;
                </SvgIcon>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.loginDialogButton}
                  onClick={handleLogin}
                >
                  Log In/Sign Up
                </Button>
              </DialogContent>
            </DialogTitle>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default NewIdea;
