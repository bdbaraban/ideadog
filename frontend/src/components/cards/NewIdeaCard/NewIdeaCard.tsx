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
import { Tag, useUserStatus } from '../../../api';
import { NewIdeaDialog, LoginDialog } from '.';

const useStyles = makeStyles(
  (theme: Theme): Styles =>
    createStyles({
      // Style of new idea card displayed on home screen
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

interface NewIdeaProps {
  allTags: Tag[];
}

const NewIdeaCard = ({ allTags }: NewIdeaProps): React.ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);
  const [isOnline, setIsOnline] = React.useState<boolean>(useUserStatus());

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleLogin = (): void => {
    setIsOnline(true);
  };

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          className={classes.cardButton}
        >
          I&apos;ve got a bright new idea...
          <Icon fontSize="small">edit</Icon>
        </Button>
        {isOnline ? (
          // New idea dialog, if user is logged in
          <NewIdeaDialog
            open={open}
            handleClose={handleClose}
            allTags={allTags}
          />
        ) : (
          // Login dialog, if user is not logged in
          <LoginDialog
            open={open}
            handleClose={handleClose}
            handleLogin={handleLogin}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default NewIdeaCard;
