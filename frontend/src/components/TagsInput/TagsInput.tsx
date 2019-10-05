import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState
} from 'react';
import Autosuggest, {
  OnSuggestionSelected,
  SuggestionsFetchRequestedParams
} from 'react-autosuggest';

import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

import ChipInput from 'material-ui-chip-input';
import PaperSuggestionsContainer from './PaperSuggestionsContainer';
import Suggestion from './Suggestion';

import { useTagsState } from 'hooks';
import { Tag } from 'types';
import { formatTag } from 'utils';

// TagsInput component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      width: '100%'
    },
    suggestionsContainerOpen: {
      background: '#4f5982',
      color: theme.palette.common.white,
      maxHeight: 250,
      minWidth: 275,
      overflowY: 'auto',
      position: 'fixed',
      marginTop: theme.spacing(1)
    },
    suggestion: {
      display: 'block'
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    },
    chip: {
      background: '#4f5982',
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
    },
    label: {
      color: theme.palette.common.white,
      '&.Mui-focused:not(.Mui-error)': {
        color: theme.palette.common.white,
        opacity: 0.42
      }
    },
    underline: {
      '&::before': {
        backgroundColor: fade(theme.palette.common.white, 0.15)
      },
      '&:hover:not(.disabled)::before': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      }
    },
    inkbar: {
      '&::before': {
        backgroundColor: fade(theme.palette.common.white, 0.15)
      },
      '&::after': {
        backgroundColor: theme.palette.secondary.main
      }
    },
    error: {
      '&::after': {
        backgroundColor: theme.palette.error.main
      }
    },
    inputRoot: {
      color: theme.palette.common.white
    }
  })
);

// TagsInput component prop types
interface TagsInputProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

/**
 * Tag-chips autosuggest input used in NewIdeaDialog
 */
const TagsInput: FC<TagsInputProps> = ({ tags, setTags }: TagsInputProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Select all tags from Redux store
  const { all } = useTagsState();

  // Tag suggestions based on input
  const [suggestions, setSuggestions] = useState<Tag[]>([]);

  // User tag input
  const [input, setInput] = useState<string>('');

  // Match tag suggestions based on input
  const handleSuggestionsFetchRequested = ({
    value
  }: SuggestionsFetchRequestedParams): void => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const regex = new RegExp(`${inputValue}`);

    setSuggestions(
      inputLength === 0
        ? []
        : all.filter(
            (tag: Tag): boolean =>
              formatTag(tag.key)
                .toLowerCase()
                .search(regex) !== -1
          )
    );
  };

  // Clear autosuggest suggestions
  const handleSuggestionsClearRequested = (): void => {
    setSuggestions([]);
  };

  // Add a selected tag chip
  const handleAddChip = (chip: string): void => {
    if (tags.indexOf(chip) < 0) {
      setTags(tags => [...tags, chip]);
      setInput('');
      setSuggestions([]);
    }
  };

  // Add a tag based on a selected suggestion
  const handleSuggestionSelected: OnSuggestionSelected<Tag> = (
    e,
    { suggestionValue }
  ): void => {
    handleAddChip(suggestionValue);
    e.preventDefault();
  };

  // Remove a selected tag chip
  const handleDeleteChip = (chip: string): void => {
    setTags(tags =>
      tags.filter((tag: string): boolean => formatTag(tag) !== chip)
    );
  };

  // Update text input
  const handleTextFieldInputChange = (
    _: React.ChangeEvent<{}>,
    { newValue }: Autosuggest.ChangeEvent
  ): void => {
    setInput(newValue);
  };

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderInputComponent={({
        tags,
        value,
        onChange,
        chips,
        ...rest
      }: any): ReactElement => {
        return (
          <ChipInput
            classes={{
              chip: classes.chip,
              label: classes.label,
              underline: classes.underline,
              inkbar: classes.inkbar,
              error: classes.error,
              inputRoot: classes.inputRoot
            }}
            fullWidth
            clearInputValueOnChange
            value={chips}
            onUpdateInput={onChange}
            error={tags.length > 5}
            {...rest}
          />
        );
      }}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={PaperSuggestionsContainer}
      getSuggestionValue={(suggestion: Tag): string => suggestion.key}
      renderSuggestion={Suggestion}
      onSuggestionSelected={handleSuggestionSelected}
      focusInputOnSuggestionClick={false}
      inputProps={{
        id: 'tags-autosuggest-input',
        label: 'Tags (max 5)',
        placeholder: 'Search or enter tags',
        chips: tags.map((tag: string): string => formatTag(tag)),
        tags,
        value: input,
        onChange: handleTextFieldInputChange,
        onAdd: (chip: string): void => handleAddChip(chip),
        onDelete: (chip: string): void => handleDeleteChip(chip)
      }}
    />
  );
};

export default TagsInput;
