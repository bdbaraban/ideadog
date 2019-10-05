import React, { ChangeEvent, FC, useState } from 'react';
import { useRouter } from 'next/router';

import NewIdeaDialogContent from './NewIdeaDialogContent';
import NewIdeaDialogTitle from './NewIdeaDialogTitle';
import { CustomDialog, CustomSnackbar, Emoji } from 'components/common';

import { useAppState, useSnackbar } from 'hooks';
import { useThunkDispatch } from 'store';
import { fetchIdeas } from 'store/ideas';
import { fetchTags } from 'store/tags';
import { setClosed } from 'store/newIdea';
import 'isomorphic-unfetch';

/**
 * Wraps input dialog for posting new ideas
 */
const NewIdeaDialogContainer: FC<{}> = () => {
  // Select Next router
  const router = useRouter();

  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select new idea and user state from Redux store
  const { newIdea, user } = useAppState();

  // Idea text
  const [text, setText] = useState<string>('');

  // Idea tags
  const [tags, setTags] = useState<string[]>([]);

  // Snackbar state
  const { snackbarOpen, setSnackbarOpen, handleSnackbarClose } = useSnackbar();

  // Toggle dialog open/closed
  const handleClose = (): void => {
    dispatch(setClosed());
  };

  // Save latest idea text
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  // Post idea and refresh ideas
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

    // Update ideas, if not on single idea page
    if (!router.pathname.startsWith('/idea')) {
      await dispatch(fetchIdeas());
    }

    // Update tags asynchronously
    dispatch(fetchTags());

    // Close dialog
    handleClose();

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
      <CustomDialog
        onClose={handleClose}
        aria-labelledby="new-idea-dialog"
        open={newIdea.open}
        size="540"
      >
        <NewIdeaDialogTitle
          handleClose={handleClose}
          handlePost={handlePost}
          characterCount={text.length}
          textError={textError}
          postError={postError}
        />
        <NewIdeaDialogContent
          text={text}
          handleChange={handleChange}
          tags={tags}
          setTags={setTags}
        />
      </CustomDialog>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        label="idea-posted-message"
        message={
          <span id="idea-posted-message">
            Idea posted!
            <Emoji label="raising-hands" symbol="🙌" />
          </span>
        }
      />
    </>
  );
};

export default NewIdeaDialogContainer;
