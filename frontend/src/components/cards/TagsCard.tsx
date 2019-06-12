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
import { CheckboxTag } from '../../types';
import { TagsMenuList } from '..';

/**
 * TagsCard component style
 */
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

/**
 * TagsCard component prop types
 */
interface TagsCardProps {
  // Array of currently-checked tag names
  checkboxTags: CheckboxTag[];
}

/**
 * Tag-filtering card component displayed as second item in InfoGrid
 */
const TagsCard = ({ checkboxTags }: TagsCardProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} color="textSecondary">
          Tags
        </Typography>
        <TagsMenuList checkboxTags={checkboxTags} />
      </CardContent>
    </Card>
  );
};

export default React.memo(TagsCard);
