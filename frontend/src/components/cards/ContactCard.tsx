import React from 'react';
import Card from '@material-ui/core/Card';
import {
  Avatar,
  CardContent,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import Laptop from '@material-ui/icons/Laptop';
import { GithubCircle, LinkedinBox } from 'mdi-material-ui';
import { Styles } from 'jss';

/**
 * ContactCard component style
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
      infoTitle: {
        fontWeight: 'bold'
      },
      link: {
        textDecoration: 'none',
        color: theme.palette.common.white
      },
      nested: {
        paddingLeft: theme.spacing(3)
      }
    })
);

interface ContactCardProps {
  title: string;
  name: string;
  image: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

/**
 * Author contact cards
 */
const ContactCard = ({
  title,
  name,
  image,
  github,
  linkedin,
  portfolio
}: ContactCardProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised={true}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.infoTitle} color="textSecondary">
          {title}
        </Typography>
        <List component="nav">
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={`${name} Avatar`} src={image} />
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <GithubCircle htmlColor="white" />
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
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <LinkedinBox htmlColor="white" />
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
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <Laptop htmlColor="white" />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItem>
          </a>
        </List>
      </CardContent>
    </Card>
  );
};

export default React.memo(ContactCard);
