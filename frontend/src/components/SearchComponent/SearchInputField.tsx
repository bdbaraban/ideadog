import React, { ChangeEvent, FC, KeyboardEvent } from 'react';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';

// SearchInputField component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      position: 'relative',
      width: '100%'
    },
    icon: {
      color: theme.palette.common.white,
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      color: theme.palette.common.white,
      padding: theme.spacing(1, 1, 1, 7),
      width: '100%'
    }
  })
);

// SearchInputField component prop types
export interface SearchInputFieldProps {
  text: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Text field to input user search query
 */
const SearchInputField: FC<SearchInputFieldProps> = ({
  text,
  handleChange,
  handleKeyPress
}: SearchInputFieldProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <div className={classes.field}>
      <div className={classes.icon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        placeholder="Search..."
        value={text}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default SearchInputField;
