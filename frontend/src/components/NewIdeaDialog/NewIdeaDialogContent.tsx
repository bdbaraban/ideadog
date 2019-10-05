import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { CustomTextField } from 'components/common';
import TagsInput from 'components/TagsInput';
import 'isomorphic-unfetch';

// NewIdeaDialogContent component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
);

// NewIdeaDialogContent component prop types
interface NewIdeaDialogContentProps {
  text: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

/**
 * Text field and tags select container for posting new ideas
 */
const NewIdeaDialogContent: FC<NewIdeaDialogContentProps> = ({
  text,
  handleChange,
  tags,
  setTags
}: NewIdeaDialogContentProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <DialogContent className={classes.content}>
      <CustomTextField
        id="new-idea-text-field"
        value={text}
        onChange={handleChange}
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
  );
};

export default NewIdeaDialogContent;
