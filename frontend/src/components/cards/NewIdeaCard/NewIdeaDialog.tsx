import React from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  DialogContent,
  Container,
  FormControl,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  SvgIcon,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomTextField } from '../../';
import { TagsInputLabel, TagsSelect } from '.';
import { useNavigation, useCurrentRoute } from 'react-navi';
import { Tag } from '../../../api';
import { SadTully, HappyTully } from '../../../icons';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
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
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(1),
          flexDirection: 'column'
        }
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
        padding: '17.5px 0 0 0',
        [theme.breakpoints.down('xs')]: {
          justifyContent: 'center'
        }
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

interface NewIdeaDialogProps {
  open: boolean;
  toggleOpen: () => void;
  allTags: Tag[];
}

const NewIdeaDialog = ({
  open,
  toggleOpen,
  allTags
}: NewIdeaDialogProps): React.ReactElement => {
  const classes = useStyles();
  const navigation = useNavigation();
  const route = useCurrentRoute();

  const [text, setText] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]);

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

  const handlePost = async (): Promise<void> => {
    await fetch('http://localhost:5000/api/idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        /* eslint-disable @typescript-eslint/camelcase */
        owner_id: '902317',
        /* eslint-enable @typescript-eslint/camelcase */
        tags: tags.map((tag: string): string => tag.toLowerCase())
      })
    });
    toggleOpen();
    navigation.navigate(route.url.href);
  };

  const textError = text.length === 0 || text.length > 140;
  const tagsError = tags.length > 3;
  const postError = textError || tagsError;

  return (
    <Dialog
      onClose={toggleOpen}
      aria-labelledby="new-idea-dialog"
      open={open}
      fullWidth={true}
    >
      <DialogTitle className={classes.newIdeaDialogTitle}>
        <IconButton
          aria-label="Close"
          className={classes.newIdeaDialogCloseButton}
          color="secondary"
          onClick={toggleOpen}
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
          onClick={handlePost}
        >
          Post
        </Button>
      </DialogTitle>
      <DialogContent className={classes.newIdeaDialogContent}>
        <CustomTextField
          id="new-idea-text-field"
          value={text}
          error={text.length > 140}
          onChange={handleTextChange}
          variant="filled"
          autoFocus={true}
          fullWidth={true}
          label="I've got a bright new idea..."
          margin="none"
          multiline
          placeholder="A dog hotel, for humans."
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
                {allTags.map(
                  (tag: Tag): React.ReactElement => {
                    const name = `${tag.key
                      .charAt(0)
                      .toUpperCase()}${tag.key.slice(1)}`;
                    return (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          color="default"
                          checked={tags.indexOf(name) > -1}
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    );
                  }
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
  );
};

export default NewIdeaDialog;
