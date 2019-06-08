import React from 'react';
import Card from '@material-ui/core/Card';
import {
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  MenuList
} from '@material-ui/core';
import { Styles } from 'jss';
import { useNavigation, useCurrentRoute } from 'react-navi';
import { TagsCardListItem } from '../';
import { Tag } from '../../api';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      card: {
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.common.white
      },
      cardContent: {
        '&:last-child': {
          paddingBottom: 16
        }
      },
      title: {
        fontWeight: 'bold'
      },
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

interface TagsCardProps {
  currentTags: string[];
  allTags: Tag[];
}

export interface CheckboxTag {
  [key: string]: {
    count: number;
    checked: boolean;
  };
}

const TagsCard = ({
  currentTags,
  allTags
}: TagsCardProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  const [checkboxTags, setCheckboxTags] = React.useState<CheckboxTag[]>(
    allTags.map(
      (tag: Tag): CheckboxTag => {
        const name = `${tag.key.charAt(0).toUpperCase()}${tag.key.slice(1)}`;
        let obj: CheckboxTag = {};
        obj[name] = {
          count: tag.count,
          checked: currentTags.includes(name)
        };
        return obj;
      }
    )
  );

  const handleToggle = (tag: CheckboxTag): (() => void) => (): void => {
    const checked = [...checkboxTags];
    const index = checked.indexOf(tag);

    tag[Object.keys(tag)[0]].checked = !tag[Object.keys(tag)[0]].checked;
    checked[index] = tag;
    setCheckboxTags(checked);

    const query: string = checked
      .reduce((query: string[], tag: CheckboxTag): string[] => {
        if (Object.values(tag)[0].checked) {
          query.push(Object.keys(tag)[0].toLowerCase());
        }
        return query;
      }, [])
      .join(',');

    navigation.navigate(
      query.length !== 0
        ? `${route.url.pathname}?tags=${encodeURIComponent(query)}`
        : `${route.url.pathname}`
    );
  };

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color="textSecondary">
          Tags
        </Typography>
        <MenuList id="tags-menu" className={classes.list}>
          {checkboxTags.map(
            (tag: CheckboxTag): React.ReactElement => (
              <TagsCardListItem
                key={Object.keys(tag)[0]}
                tag={tag}
                handleToggle={handleToggle}
              />
            )
          )}
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default TagsCard;
