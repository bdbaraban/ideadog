import React, { ReactElement } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { useSelector } from 'react-redux';
import { AppState, useThunkDispatch } from 'store';
import { addSelectedTag, removeSelectedTag } from 'store/tags/actions';
import { TagsState } from 'store/tags/types';
import { formatTag } from 'utils';

/**
 * Tag-filtering menu checkbox list
 */
const TagsList = (): ReactElement => {
  // Load Redux dispatcher
  const dispatch = useThunkDispatch();

  // Select tags from Redux store
  const tags = useSelector((state: AppState): TagsState => state.tags);

  // Toggle a selected tag
  const handleToggle = (tag: string): VoidFunction => (): void => {
    if (tags.selected[tag] === undefined) {
      dispatch(addSelectedTag(tag));
    } else {
      dispatch(removeSelectedTag(tag));
    }
  };

  const Row = ({ index, style }: ListChildComponentProps): ReactElement => {
    const tag = tags.all[index];
    const labelId = `tags-checkbox-list-label-${tag.key}`;

    return (
      <ListItem
        key={tag.key}
        role={undefined}
        dense
        button
        onClick={handleToggle(tag.key)}
        style={style}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={tags.selected[tag.key] !== undefined}
            tabIndex={-1}
            disableRipple
            inputProps={{
              'aria-labelledby': labelId
            }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={formatTag(tag.key)}
          primaryTypographyProps={{ variant: 'body1' }}
        />
        <Typography>{tag.count}</Typography>
      </ListItem>
    );
  };

  return (
    <AutoSizer disableHeight>
      {({ width }: Size): ReactElement => (
        <FixedSizeList
          height={250}
          itemCount={tags.all.length}
          itemSize={50}
          width={width}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default TagsList;
