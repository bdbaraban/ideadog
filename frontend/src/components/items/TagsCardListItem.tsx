import React from 'react';
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText
} from '@material-ui/core';
import Label from '@material-ui/icons/Label';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import { CheckboxTag } from '../cards';

interface TagsCardListItemProps {
  checkboxTags: CheckboxTag[];
  index: number;
  handleToggle: (tag: CheckboxTag) => () => void;
}

const TagsCardListItem = ({
  checkboxTags,
  index,
  handleToggle
}: TagsCardListItemProps): React.ReactElement => {
  const tag: string = Object.keys(checkboxTags[index])[0];
  const value: boolean = Object.values(checkboxTags[index])[0];

  return (
    <ListItem key={index} button onClick={handleToggle(checkboxTags[index])}>
      <ListItemIcon>
        <Checkbox
          icon={<LabelOutlined />}
          checkedIcon={<Label />}
          edge="start"
          checked={value}
          disableRipple
          inputProps={{ 'aria-labelledby': tag }}
        />
      </ListItemIcon>
      <ListItemText id={tag} primary={tag} />
    </ListItem>
  );
};

export default TagsCardListItem;
