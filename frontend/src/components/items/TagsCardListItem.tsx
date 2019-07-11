import React from 'react';
import {
  Checkbox,
  createStyles,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  Theme,
  Typography
} from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import Label from '@material-ui/icons/Label';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import { CheckboxTag } from '../../types';

/**
 * TagsCardListItem component style
 */
const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      icon: {
        minWidth: 60,
        [theme.breakpoints.down('sm')]: {
          minWidth: 50
        },
        [theme.breakpoints.down('xs')]: {
          minWidth: 40
        }
      },
      text: {
        color: theme.palette.common.white,
        marginRight: 16
      },
      container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      count: {
        color: fade(theme.palette.common.white, 0.5)
      }
    })
);

/**
 * TagsCardListItem component prop types
 */
interface TagsCardListItemProps {
  // Index of item in virtualized list
  index: number;
  // Current tag
  tag: CheckboxTag;
  // Checkbox toggler, inherited from parent list component
  handleToggle: (tag: CheckboxTag, index: number) => VoidFunction;
}

/**
 * Generic tags list item used by TagsCard
 */
const TagsCardListItem = ({
  tag,
  handleToggle,
  index
}: TagsCardListItemProps): React.ReactElement => {
  const classes = useStyles();

  const name: string = Object.keys(tag)[0];
  const { count, checked } = Object.values(tag)[0];

  return (
    <MenuItem button onClick={handleToggle(tag, index)}>
      <ListItemIcon className={classes.icon}>
        <Checkbox
          icon={<LabelOutlined />}
          checkedIcon={<Label />}
          edge="start"
          checked={checked}
          disableRipple
          inputProps={{ 'aria-labelledby': name }}
        />
      </ListItemIcon>
      <div className={classes.container}>
        <ListItemText className={classes.text} id={name} primary={name.replace(/_/g, ' ')} />
        <Typography className={classes.count}>{count}</Typography>
      </div>
    </MenuItem>
  );
};

export default React.memo(TagsCardListItem);
