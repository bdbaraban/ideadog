import React, { FC } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogTitle,
  CustomExpansionPanel,
  Emoji
} from 'components/common';

// AboutDialog component styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.secondary.main
    }
  })
);

// AboutDialog component prop types
interface AboutDialogProps {
  open: boolean; // Component open/closed status
  handleClose: (value: string) => void; // Function to close the component
}

/**
 * About IdeaDog FAQ dialog
 */
const AboutDialog: FC<AboutDialogProps> = ({
  open,
  handleClose
}: AboutDialogProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <CustomDialog
      onClose={handleClose}
      aria-labelledby="about-dialog"
      open={open}
      size="444"
    >
      <CustomDialogTitle id="about-dialog-title">FAQ</CustomDialogTitle>
      <CustomDialogContent>
        <CustomExpansionPanel label="what-is-this" title="What is this?">
          IdeaDog is a social media platform for sharing ideas.{' '}
          <Emoji label="light-bulb" symbol="💡" />
          <br />
          <br />
          We&apos;ve all had those moments, those sudden bursts of inspiration
          where we go - &quot;wow, that is simply a <i>great</i> idea&quot; -
          but know we will never follow up.
          <br />
          <br />
          Now, instead of losing those ideas, share them with the world!
        </CustomExpansionPanel>
        <CustomExpansionPanel
          label="what-is-the-dogs-name"
          title="What's the dog's name?"
        >
          His name is Tully, and he is a beloved boy{' '}
          <Emoji label="dog" symbol="🐕" />.
        </CustomExpansionPanel>
        <CustomExpansionPanel
          label="how-does-login-work"
          title="How does login work?"
        >
          Super easily! Upon entering your email, we will send you a one-time
          &quot;magic link&quot; <Emoji label="sparkles" symbol="✨" />
          . Clicking the link will trigger a verification on our end, after
          which you will be redirected back here, logged in and enabled to share
          some great ideas!
          <br />
          <br />
          Note that for verification to succeed, you must open the link in the
          same brower you submitted your initial login request. The link will
          expire after 15 minutes.
        </CustomExpansionPanel>
        <CustomExpansionPanel
          label="what-is-the-tech-stack"
          title="What is the tech stack behind this?"
        >
          Ah, our kind of question. We like to call IdeaDog
          &quot;statically-typed&quot; - that is, the front-end is built in
          React, using TypeScript, while the back-end features a Rust web
          server. In our book: TypeScript + Rust = The Ultimate Statically-Typed
          Web App <Emoji label="flexed-biceps" symbol="💪" />
          .
          <br />
          <br />
          In addition, IdeaDog utilizes Next.js and Express.js for a
          server-side-rendered front-end, Material-UI for the design/web
          components, and an ArangoDB database.
        </CustomExpansionPanel>
        <CustomExpansionPanel
          label="can-i-see-the-code"
          title="Can I see the code behind this?"
        >
          <a
            href="https://github.com/bdbaraban/ideadog"
            aria-label="IdeaDog GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            Please do!
          </a>
        </CustomExpansionPanel>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default AboutDialog;
