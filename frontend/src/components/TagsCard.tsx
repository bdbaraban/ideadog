import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {
  createStyles,
  fade,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import { TagsList } from 'components';

// TagsCard component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      color: theme.palette.common.white
    },
    titleTypographyProps: {
      fontWeight: 'bold'
    },
    avatar: {
      height: 24
    }
  })
);

/**
 * Tag-filtering card component displayed as second item in InfoGrid
 */
const TagsCard = (): ReactElement => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        classes={{
          avatar: classes.avatar
        }}
        avatar={<LocalOfferIcon />}
        title="Tags"
        titleTypographyProps={{
          className: classes.titleTypographyProps,
          variant: 'subtitle1'
        }}
      />
      <Divider />
      <CardContent>
        <TagsList />
      </CardContent>
    </Card>
  );
};

export default TagsCard;
