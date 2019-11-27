import React from "react";

import { NavLink, withRouter } from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    bigAvatar: {
      width: 60,
      height: 60,
    },
  }));

const MainNavProfile = (props) =>  {

    const classes = useStyles();

    return (
        <List>
        <ListItem button component={NavLink} to="/profile">
            <ListItemIcon>
            <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/500" />
            </ListItemIcon>
            <ListItemText primary="Profile" secondary="Member"/>
            
        </ListItem>
    </List>
    )
}

export default MainNavProfile;