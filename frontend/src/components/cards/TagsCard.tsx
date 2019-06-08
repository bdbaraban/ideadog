import React from 'react';
import Card from '@material-ui/core/Card';
import {
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import VirtualizedList from '@dwqs/react-virtual-list';
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
        scrollbarWidth: 'none',
        overflow: '-moz-scrollbars-none',
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
  [key: string]: boolean;
}

const TagsCard = ({
  currentTags,
  allTags
}: TagsCardProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  const allTagNames = allTags.map((tag: Tag): string => tag.name);

  const [checkboxTags, setCheckboxTags] = React.useState<CheckboxTag[]>(
    allTagNames.map(
      (tag: string): CheckboxTag => {
        let obj: CheckboxTag = {};
        obj[tag] = currentTags.includes(tag);
        return obj;
      }
    )
  );

  const handleToggle = (tag: CheckboxTag): (() => void) => (): void => {
    const checked = [...checkboxTags];
    const index = checked.indexOf(tag);

    tag[Object.keys(tag)[0]] = !tag[Object.keys(tag)[0]];
    checked[index] = tag;
    setCheckboxTags(checked);

    const query: string = checked
      .reduce((query: string[], tag: CheckboxTag): string[] => {
        if (Object.values(tag)[0]) {
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
        <VirtualizedList
          className={classes.list}
          height={225}
          itemCount={allTags.length}
          useWindow={false}
          renderItem={({
            index
          }: {
            [key: string]: number;
          }): React.ReactElement => (
            <TagsCardListItem
              checkboxTags={checkboxTags}
              index={index}
              handleToggle={handleToggle}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};

export default TagsCard;
