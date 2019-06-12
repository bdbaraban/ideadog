import React from 'react';
import { createStyles, makeStyles, MenuList } from '@material-ui/core';
import { Styles } from 'jss';
import { useNavigation, useCurrentRoute } from 'react-navi';
import { CheckboxTag } from '../types';
import { TagsCardListItem } from '.';

/**
 * TagsMenuList component style
 */
const useStyles = makeStyles(
  (): Styles =>
    createStyles({
      list: {
        maxHeight: 250,
        scrollbarWidth: 'none',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: 0
        }
      }
    })
);

/**
 * TagsCard component prop types
 */
interface TagsCardProps {
  // Array of currently-checked tag names
  checkboxTags: CheckboxTag[];
}

/**
 * Tag-filtering menu checkbox list
 */
const TagsMenuList = ({ checkboxTags }: TagsCardProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  const [currentTags, setCurrentTags] = React.useState<CheckboxTag[]>([]);
  React.useEffect((): void => {
    setCurrentTags(checkboxTags);
  }, [checkboxTags]);

  // Check the tag and redirect to the new query route
  const handleToggle = (
    tag: CheckboxTag,
    index: number
  ): VoidFunction => (): void => {
    const checked = [...currentTags];

    tag[Object.keys(tag)[0]].checked = !tag[Object.keys(tag)[0]].checked;
    checked[index] = tag;
    setCurrentTags(checked);

    const tags: string = checked.reduce(
      (query: string, tag: CheckboxTag): string => {
        if (Object.values(tag)[0].checked) {
          if (query !== '') {
            query += ',';
          }
          query += Object.keys(tag)[0].toLowerCase();
        }
        return query;
      },
      ''
    );

    navigation.navigate(
      tags.length !== 0
        ? `${route.url.hostname}?tags=${encodeURIComponent(tags)}`
        : `${route.url.hostname}`
    );
  };

  return (
    <MenuList id="tags-menu" className={classes.list}>
      {currentTags.map(
        (tag: CheckboxTag, index: number): React.ReactElement => (
          <TagsCardListItem
            key={Object.keys(tag)[0]}
            tag={tag}
            handleToggle={handleToggle}
            index={index}
          />
        )
      )}
    </MenuList>
  );
};

export default React.memo(TagsMenuList);
