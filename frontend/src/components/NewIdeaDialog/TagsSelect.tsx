import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import { Styles } from 'jss';
import Select, { SelectProps } from '@material-ui/core/Select';
import { Input } from '@material-ui/core';

/**
 * TagsSelect Select component style
 */
const useSelectStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      icon: {
        color: fade(theme.palette.common.white, 0.15)
      }
    })
);

/**
 * TagsSelect Input component style
 */
const useInputStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      underline: {
        '&:before': {
          borderBottom: `1px solid ${fade(theme.palette.common.white, 0.15)}`
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `1px solid ${fade(theme.palette.common.white, 0.25)}`
        },
        '&:after': {
          borderBottom: `2px solid ${theme.palette.common.white}`
        }
      },
      disabled: {},
      focused: {},
      error: {},
      input: {
        minHeight: 36,
        minWidth: 175,
        maxWidth: 275,
        width: 'max-content'
      }
    })
);

/**
 * Custom TagsSelect component used by NewIdeaDialog
 */
const TagsSelect = (props: SelectProps): React.ReactElement => {
  return (
    <Select
      multiple
      classes={useSelectStyles()}
      input={<Input classes={useInputStyles()} />}
      MenuProps={{
        PaperProps: {
          style: {
            color: '#fff',
            maxHeight: 250,
            minWidth: 300,
            maxWidth: 300
          }
        }
      }}
      {...props}
    />
  );
};

export default React.memo(TagsSelect);
