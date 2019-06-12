import React from 'react';
import Card from '@material-ui/core/Card';
import {
  Button,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Icon
} from '@material-ui/core';
import { Styles } from 'jss';
import { fade } from '@material-ui/core/styles';
import { UserSession } from '../../api';
import { Tag } from '../../types';
import { NewIdeaDialog, NotLoggedInDialog } from '..';

/**
 * NewIdeaCard component style
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
      cardButton: {
        boxShadow: 'none',
        textTransform: 'none',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        }
      }
    })
);

/**
 * NewIdeaCard component prop types
 */
interface NewIdeaCardProps {
  // Current user session
  user: UserSession;

  // Array of all available tags
  allTags: Tag[];
}

const NewIdeaCard = ({
  user,
  allTags
}: NewIdeaCardProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = (): void => {
    setOpen(!open);
  };

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleOpen}
          className={classes.cardButton}
        >
          I&apos;ve got a bright new idea...
          <Icon fontSize="small">edit</Icon>
        </Button>
        {user.current ? (
          // New idea dialog, if user is logged in
          <NewIdeaDialog
            open={open}
            toggleOpen={toggleOpen}
            allTags={allTags}
            user={user}
          />
        ) : (
          // Not-logged-in dialog, if user is not logged in
          <NotLoggedInDialog
            open={open}
            toggleSelfOpen={toggleOpen}
            user={user}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(NewIdeaCard);
