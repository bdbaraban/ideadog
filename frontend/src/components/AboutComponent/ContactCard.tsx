import React, { FC } from 'react';

import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import LaptopIcon from '@material-ui/icons/Laptop';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { GithubCircle, LinkedinBox } from 'mdi-material-ui';

import { ApplicationBarCard } from 'components/common';

// ContactCard component style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 60,
      height: 60
    },
    titleTypographyProps: {
      fontWeight: 'bold'
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.common.white
    },
    icon: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main
    }
  })
);

// ContactCard component prop types
interface ContactCardProps {
  name: string; // Contact name
  title: string; // Contact title
  image: string; // Link to contact image
  github: string; // Contact GitHub
  linkedin: string; // Contact LinkedIn
  portfolio: string; // Contact portfolio link
}

/**
 * Developer contact cards
 */
const ContactCard: FC<ContactCardProps> = ({
  title,
  name,
  image,
  github,
  linkedin,
  portfolio
}: ContactCardProps) => {
  // Select Material-UI styles
  const classes = useStyles();

  return (
    <ApplicationBarCard>
      <CardHeader
        avatar={
          <Avatar
            aria-label={`${name}`}
            src={image}
            className={classes.avatar}
          />
        }
        title={name}
        titleTypographyProps={{
          className: classes.titleTypographyProps,
          variant: 'subtitle1'
        }}
        subheader={title}
      />
      <Divider />
      <CardContent>
        <List>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <GithubCircle htmlColor="white" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="GitHub" />
            </ListItem>
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <LinkedinBox htmlColor="white" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </ListItem>
          </a>
          <a
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <LaptopIcon htmlColor="white" fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItem>
          </a>
        </List>
      </CardContent>
    </ApplicationBarCard>
  );
};

export default ContactCard;
