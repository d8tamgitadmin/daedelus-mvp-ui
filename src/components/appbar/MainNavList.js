import React from 'react';

import { NavLink, withRouter } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SearchIcon from '@material-ui/icons/Search';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import Badge from '@material-ui/core/Badge';
import PeopleIcon from '@material-ui/icons/People';

const MenuNavList = (props) => {
    return (
        <React.Fragment>
        <List>
        <ListItem button component={NavLink} to="/invites">
                <ListItemIcon> 
                        <Badge badgeContent={4} color="secondary">
                              <MailIcon />
                         </Badge>
                  </ListItemIcon>
                <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button component={NavLink} to="/accounts">
                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button component={NavLink} to="/credentials">
                <ListItemIcon><AccountBalanceIcon/></ListItemIcon>
                <ListItemText primary="KYC" />
          </ListItem>
          <ListItem button component={NavLink} to="/search">
                <ListItemIcon><PeopleIcon/></ListItemIcon>
                <ListItemText primary="Members" />
          </ListItem>
         
          <ListItem button component={NavLink} to="/Ledger">
                <ListItemIcon><SettingsApplicationsIcon/></ListItemIcon>
                <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </React.Fragment>)
}

export default MenuNavList;