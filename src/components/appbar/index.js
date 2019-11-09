import React from 'react';
import { NavLink } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color:"white",
    "text-decoration": "none"
  },
  active:{
      color:"red"
  }

 
}));


export default function MenuAppBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>            
            <NavLink style={{ textDecoration: 'none' }} to="/" activeClassName="active"><Button color="inherit" className={classes.title}>Login</Button></NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/home" activeClassName="active"><Button color="inherit" className={classes.title}>Home</Button></NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/register" activeClassName="active"><Button color="inherit" className={classes.title}>Register </Button></NavLink>          
            <NavLink style={{ textDecoration: 'none' }} to="/Ledger" activeClassName="active"><Button color="inherit" className={classes.title}>Ledger  </Button></NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/Create" activeClassName="active"><Button color="inherit" className={classes.title}>Create </Button></NavLink>          
          </Toolbar>
        </AppBar>
      </div>
    );
  }    