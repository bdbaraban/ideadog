import React, { FC } from 'react';

import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import SearchInputField, { SearchInputFieldProps } from './SearchInputField';
import { ApplicationBarIconButton } from 'components/common';

import { usePopover } from 'hooks';

// SearchIconMenu component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    }
  })
);

/**
 * Search icon that pops up search field, displayed on mobile
 */
const SearchIconMenu: FC<SearchInputFieldProps> = ({
  text,
  handleChange,
  handleKeyPress
}: SearchInputFieldProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  // Popover state
  const { anchorEl, handleClick, handleClose } = usePopover();

  return (
    <>
      <ApplicationBarIconButton onClick={handleClick}>
        <SearchIcon />
      </ApplicationBarIconButton>
      <Popover
        classes={{
          paper: classes.paper
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
      >
        <SearchInputField
          text={text}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      </Popover>
    </>
  );
};

export default SearchIconMenu;
