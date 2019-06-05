import React from 'react';
import Card from '@material-ui/core/Card';
import {
  CardContent,
  Checkbox,
  createStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import Label from '@material-ui/icons/Label';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import { useNavigation, useCurrentRoute } from 'react-navi';
import VirtualList, { ItemInfo } from 'react-tiny-virtual-list';
import { Styles } from 'jss';

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
  allTags: string[];
}

interface TagInterface {
  [key: string]: boolean;
}

const TagsCard = ({
  currentTags,
  allTags
}: TagsCardProps): React.ReactElement => {
  const classes = useStyles();
  const route = useCurrentRoute();
  const navigation = useNavigation();

  const tags: TagInterface[] = allTags.map(
    (tag: string): TagInterface => {
      let obj: TagInterface = {};
      obj[tag] = currentTags.includes(tag);
      return obj;
    }
  );

  const handleToggle = (tag: TagInterface): (() => void) => (): void => {
    const checked = [...tags];
    const index = checked.indexOf(tag);

    tag[Object.keys(tag)[0]] = !tag[Object.keys(tag)[0]];
    checked[index] = tag;

    const query: string = checked
      .reduce((query: string[], tag: TagInterface): string[] => {
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
        <VirtualList
          className={classes.list}
          height={250}
          width="100%"
          itemSize={42}
          itemCount={allTags.length}
          renderItem={({ index, style }: ItemInfo): React.ReactElement => {
            const tag = Object.keys(tags[index])[0];
            const value = Object.values(tags[index])[0];

            return (
              <ListItem
                key={index}
                style={style}
                button
                onClick={handleToggle(tags[index])}
              >
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
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TagsCard;
