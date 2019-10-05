import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

import Hidden from '@material-ui/core/Hidden';

import SearchIconMenu from './SearchIconMenu';
import SearchInputField from './SearchInputField';

import { useThunkDispatch } from 'store';
import { setSearch } from 'store/search';

/**
 * Wraps searchbar component positioned second from top in ApplicationBar
 */
const SearchContainer: FC<{}> = () => {
  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Search text
  const [text, setText] = useState<string>('');

  // Save text input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  // Filter tags by search query
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      dispatch(setSearch(text));
      event.preventDefault();
    }
  };

  return (
    <>
      {/* Render input field directly on desktop */}
      <Hidden xsDown implementation="css">
        <SearchInputField
          text={text}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      </Hidden>

      {/* Render popup menu icon button on mobile */}
      <Hidden smUp implementation="css">
        <SearchIconMenu
          text={text}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      </Hidden>
    </>
  );
};

export default SearchContainer;
