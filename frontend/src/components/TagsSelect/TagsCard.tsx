import React, { FC } from 'react';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { ApplicationBarCard } from 'components/common';

import TagsList from './TagsList';

// TagsList component style
const useStyles = makeStyles(() =>
  createStyles({
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
const TagsCard: FC<{}> = () => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <ApplicationBarCard>
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
    </ApplicationBarCard>
  );
};

export default TagsCard;
