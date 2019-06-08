import React from 'react';
import {
  ListItemIcon,
  Checkbox,
  ListItemText,
  MenuItem,
  Typography,
  ListItemSecondaryAction
} from '@material-ui/core';
import Label from '@material-ui/icons/Label';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import { CheckboxTag } from '../cards';

interface TagsCardListItemProps {
  tag: CheckboxTag;
  handleToggle: (tag: CheckboxTag) => () => void;
}

const TagsCardListItem = ({
  tag,
  handleToggle
}: TagsCardListItemProps): React.ReactElement => {
  const name: string = Object.keys(tag)[0];
  const { count, checked } = Object.values(tag)[0];

  return (
    <MenuItem button onClick={handleToggle(tag)}>
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

export default TagsCardListItem;
