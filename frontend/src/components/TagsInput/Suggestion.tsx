import React, { MouseEvent, ReactElement } from 'react';
import { RenderSuggestionParams } from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import MenuItem from '@material-ui/core/MenuItem';

import { Tag } from 'types';
import { formatTag } from 'utils';

/**
 * Render autosuggest option
 */
const Suggestion = (
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
};

export default Suggestion;
