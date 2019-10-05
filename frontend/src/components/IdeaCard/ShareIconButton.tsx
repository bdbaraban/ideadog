import React, { FC, ReactElement } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Share from 'mdi-material-ui/Share';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ClipboardCopy, Link } from 'components/common';

// ShareIconButton component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    shareDialogTitle: {
      color: theme.palette.common.white,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    shareDialogContent: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      marginBottom: theme.spacing(1),
      paddingTop: 0,
      width: '100%'
    },
    link: {
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.secondary.dark
      }
    }
  })
);

// ShareIconButton prop types
interface ShareIconButtonProps {
  toggleOpen: VoidFunction;
  ideaKey: string;
  open: boolean;
}

/**
 * Share icon controlling share idea dialog
 */
const ShareIconButton: FC<ShareIconButtonProps> = ({
  toggleOpen,
  ideaKey,
  open
}: ShareIconButtonProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <>
      <IconButton color="inherit" onClick={toggleOpen}>
        <Share fontSize="large" />
      </IconButton>

      <Dialog
        onClose={toggleOpen}
        aria-labelledby="share-idea-dialog"
        open={open}
      >
        <DialogTitle
          id="share-idea-dialog-title"
          className={classes.shareDialogTitle}
        >
          SHARE THIS GREAT IDEA
          <DialogContent className={classes.shareDialogContent}>
            <Link href={`/idea/${ideaKey}`} className={classes.link}>
              {`${process.env.IDEADOG_DOMAIN}/idea/${ideaKey}`}
            </Link>
            <ClipboardCopy TooltipProps={{ title: 'Copied', leaveDelay: 1000 }}>
              {({ copy }): ReactElement => (
                <IconButton
                  color="inherit"
                  onClick={(): void =>
                    copy(`${process.env.IDEADOG_DOMAIN}/idea/${ideaKey}`)
                  }
                >
                  <FileCopyIcon fontSize="large" />
                </IconButton>
              )}
            </ClipboardCopy>
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default ShareIconButton;
