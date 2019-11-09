import React, {useEffect, useState} from 'react';
import { NavLink, withRouter } from "react-router-dom";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withAuth } from '@okta/okta-react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color:"white"
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
      
      "text-decoration": "none"
  },
  appbar:{ 
    background: 'black', 
    color:"white" 
  },
  menuIcon:{
    color:"white" 
  },
  menuButton:{
   
    color:"black",
    "text-decoration": "none"
    
  },
  appbarMenu:{
    color:"white" ,
    background: 'black', 
    "text-decoration": "none"
  },
  accountCirleIcon:{
    color:"white"
  }

 
}));


const MenuAppBar = (props) => {
    const classes = useStyles();

    const [showMenu, setMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorProfileEl, setProfileAnchorEl] = useState(null);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [authenticated, setAuthentication] = useState(false);

    const handleMenuOpen = (e) => {
      e.preventDefault();
      setAnchorEl(e.currentTarget);
      setMenu({showMenu:true});    
    }

    const handleMenuClose = (e) => {
      e.preventDefault();
      setAnchorEl(null);
      setMenu({showMenu:false});
    }

    const handleAccountOpen = (e) => {
      e.preventDefault();
      setProfileAnchorEl(e.currentTarget);
      setAccountMenu({showAccountMenu:true})
      
    }

    const handleAccountClose = (e) => {
      e.preventDefault();
      setProfileAnchorEl(null);
      setAccountMenu({showAccountMenu:false})
    }

    const checkAuthentication = async () =>{
      const auth = await props.auth.isAuthenticated();
      if (auth !== authenticated) {
        setAuthentication(auth);       
      }
    }

    useEffect(() => {
        checkAuthentication();
    })
  
    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
          {authenticated &&
            <IconButton edge="start" onClick={handleMenuOpen}  className={classes.menuIcon} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>}     
            <Menu keepMounted anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
           
            <MenuItem>
                <NavLink style={{ textDecoration: 'none' }} to="/home" activeClassName="active"><Button color="inherit" className={classes.menuButton}>Home</Button></NavLink>
            </MenuItem>
            <MenuItem>
               <NavLink style={{ textDecoration: 'none' }} to="/register" activeClassName="active"><Button color="inherit" className={classes.menuButton}>Register </Button></NavLink>          
            </MenuItem>
            <MenuItem>
               <NavLink style={{ textDecoration: 'none' }} to="/Ledger" activeClassName="active"><Button color="inherit" className={classes.menuButton}>Ledger  </Button></NavLink>

            </MenuItem>
            <MenuItem>
              <NavLink style={{ textDecoration: 'none' }} to="/Create" activeClassName="active"><Button color="inherit" className={classes.menuButton}>Create </Button></NavLink>          
            </MenuItem>
            </Menu> 
            <Typography variant="h6" className={classes.title}>
            DAEDALUS DEMO 
          </Typography>
             { authenticated &&
           <>
              <IconButton edge="start" onClick={handleAccountOpen}  className={classes.menuIcon} color="inherit" aria-label="menu">
              <AccountCircle className={classes.accountCirleIcon} />
              </IconButton>
              <Menu keepMounted anchorEl={anchorProfileEl} open={Boolean(anchorProfileEl)} onClose={handleAccountClose}>
                    <MenuItem>
                    <NavLink to="/profile" activeClassName="active"> <Button color="inherit" className={classes.menuButton}>Profile </Button></NavLink>
                  </MenuItem>
                  <MenuItem>
                  <Button className={classes.appbarMenu} onClick={() => {props.auth.logout()}}>Logout</Button> 
            </MenuItem>
              </Menu>
          </>
           }   
          </Toolbar>
         
        </AppBar>
      </div>
    );
  }   
  

export default compose(
  withAuth,
  withRouter
)(MenuAppBar);