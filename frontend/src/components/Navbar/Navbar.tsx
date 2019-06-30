import React from 'react';
import { createStyles, Hidden, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Styles } from 'jss';
import { UserSession } from '../../api';
import { CheckboxTag } from '../../types';
import AccountButton from './AccountButton';
import IdeaDogTitle from './IdeaDogTitle';
import Searchbar from './Searchbar';
import SortSelect from './SortSelect';
import TagsSelect from './TagsSelect';

/**
 * Navbar component styles
 */
const useStyles = makeStyles(
  (): Styles =>
    createStyles({
      root: {
        flexGrow: 1
      },
      toolbar: {
        paddingRight: 0
      }
    })
);

/**
 * Navbar prop types
 */
interface NavbarProps {
  // Current idea-sorting filter
  sort: string;
  // Current user session
  user: UserSession;
  // Array of currently-checked tag names
  checkboxTags: CheckboxTag[];
}

/**
 * Top navbar component
 */
const Navbar = ({
  sort,
  user,
  checkboxTags
}: NavbarProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <AppBar color="primary" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IdeaDogTitle />
        <SortSelect sort={sort} />
        <Hidden mdUp>
          <TagsSelect checkboxTags={checkboxTags} />
        </Hidden>
        <Searchbar />
        <AccountButton user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);
