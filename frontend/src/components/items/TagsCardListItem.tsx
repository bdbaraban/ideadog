import React from 'react';
import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Typography
} from '@material-ui/core';
import Label from '@material-ui/icons/Label';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import { CheckboxTag, VoidFunction } from '../../types';

/**
 * TagsCardListItem component prop types
 */
interface TagsCardListItemProps {
  // Index of item in virtualized list
  index: number;

  // Current tag
  tag: CheckboxTag;

  // Checkbox toggler, inherited from parent list component
  handleToggle: (tag: CheckboxTag, index: number) => VoidFunction;
}

/**
 * Generic tags list item used by TagsCard
 */
const TagsCardListItem = ({
  tag,
  handleToggle,
  index
}: TagsCardListItemProps): React.ReactElement => {
  const name: string = Object.keys(tag)[0];
  const { count, checked } = Object.values(tag)[0];

  return (
    <MenuItem button onClick={handleToggle(tag, index)}>
      <ListItemIcon>
        <Checkbox
          icon={<LabelOutlined />}
          checkedIcon={<Label />}
          edge="start"
          checked={checked}
          disableRipple
          inputProps={{ 'aria-labelledby': name }}
        />
      </ListItemIcon>
      <ListItemText id={name} primary={name} />
      <ListItemSecondaryAction>
        <Typography>{count}</Typography>
      </ListItemSecondaryAction>
    </MenuItem>
  );
};

export default React.memo(TagsCardListItem);
