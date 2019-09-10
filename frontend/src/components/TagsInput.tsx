import React, {
  Dispatch,
  MouseEvent,
  ReactElement,
  SetStateAction,
  useState
} from 'react';
import Autosuggest, {
  RenderSuggestionsContainerParams,
  RenderSuggestionParams,
  SuggestionsFetchRequestedParams
} from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import ChipInput from 'material-ui-chip-input';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from 'store';
import { Tag } from 'types';
import { formatTag } from 'utils';

// TagsInput component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      width: '100%'
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
    textField: {
      width: '100%'
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
const TagsInput = ({ tags, setTags }: TagsInputProps): ReactElement => {
  const classes = useStyles();

  // Select all tags and new idea state from Redux store
  const all = useSelector((state: AppState): Tag[] => state.tags.all);

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

  // Add a selected tag chip
  const handleAddChip = (chip: string): void => {
    if (tags.indexOf(chip) < 0) {
      setTags(tags => [...tags, chip]);
      setInput('');
      setSuggestions([]);
    }
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
    { newValue, method }: Autosuggest.ChangeEvent
  ): void => {
    if (method === 'enter') {
      handleAddChip(newValue);
    } else {
      setInput(newValue);
    }
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
        value,
        onChange,
        chips,
        ...rest
      }: any): ReactElement => (
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
      )}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={(): void => {
        setSuggestions([]);
      }}
      renderSuggestionsContainer={({
        containerProps,
        children
      }: RenderSuggestionsContainerParams): ReactElement => (
        <Paper square {...containerProps}>
          {children}
        </Paper>
      )}
      getSuggestionValue={(suggestion: Tag): string => suggestion.key}
      renderSuggestion={(
        suggestion: Tag,
        { query, isHighlighted }: RenderSuggestionParams
      ): ReactElement => {
        const formatted = formatTag(suggestion.key);
        const matches = match(formatted, query);
        const parts = parse(formatted, matches);

        return (
          <MenuItem
            selected={isHighlighted}
            onMouseDown={(event: MouseEvent<HTMLLIElement>): void =>
              event.preventDefault()
            }
          >
            <div>
              {parts.map(part => (
                <span
                  key={part.text}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </MenuItem>
        );
      }}
      onSuggestionSelected={(e, { suggestionValue }): void => {
        handleAddChip(suggestionValue);
        e.preventDefault();
      }}
      focusInputOnSuggestionClick={false}
      inputProps={{
        id: 'tags-autosuggest-input',
        label: 'Tags (max 5)',
        placeholder: 'Search or enter tags',
        chips: tags.map((tag: string): string => formatTag(tag)),
        value: input,
        onChange: handleTextFieldInputChange,
        onAdd: (chip: string): void => handleAddChip(chip),
        onDelete: (chip: string): void => handleDeleteChip(chip)
      }}
    />
  );
};

export default TagsInput;
