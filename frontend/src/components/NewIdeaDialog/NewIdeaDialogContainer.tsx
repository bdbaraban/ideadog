import React, { ChangeEvent, FC, useState } from 'react';
import { useRouter } from 'next/router';

import NewIdeaDialogContent from './NewIdeaDialogContent';
import NewIdeaDialogTitle from './NewIdeaDialogTitle';
import { CustomDialog } from 'components/common';

import { useAppState } from 'hooks';
import { useThunkDispatch } from 'store';
import { fetchIdeas, postIdea } from 'store/ideas';
import { fetchTags } from 'store/tags';
import { setClosed } from 'store/newIdea';

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
    await dispatch(postIdea(text, user.profile.id, tags, user.bearer));

    // Update ideas, if not on single idea page
    if (!router.pathname.startsWith('/idea')) {
      dispatch(fetchIdeas());
    }

    // Update tags asynchronously
    dispatch(fetchTags());

    // Close dialog
    handleClose();

    // Clear idea input
    setText('');
    setTags([]);
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
    </>
  );
};

export default NewIdeaDialogContainer;
