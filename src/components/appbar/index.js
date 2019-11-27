import React, {useEffect, useState, Children} from 'react';
import { NavLink, withRouter } from "react-router-dom";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push, replace } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { withAuth } from '@okta/okta-react';

import * as authActions from "../../redux/actions/authActions";

import * as authSelectors from "../../redux/selectors/authSelector";

import MainNavList from "./MainNavList";
import MainNavProfile from "./MainiNavProfile";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { CssBaseline } from '@material-ui/core';
import Container from "@material-ui/core/Container";



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background:"black",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height:'100vh',
    overflow:'auto',
    padding: theme.spacing(2),
  },
  title:{
    flexGrow:1,
  }
}))

const MenuAppBar = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorProfileEl, setProfileAnchorEl] = useState(null);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [authenticated, setAuthentication] = useState(false);

    const handleMenuOpen = (e) => {
      setOpen(true)
    }

    const handleMenuClose = (e) => {
      setOpen(false)
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

    const handleLogout = async () => {
      props.actions.resetUserData();
      await props.auth.logout();      
      await props.nav.push("/");
    }

    const handleAccount = () => {
      props.nav.push(`/profile`)
    }
  
    return (
      <div className={classes.root}>
      <CssBaseline />
        <AppBar  
        color="primary"
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenuOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Daedalus POC
          </Typography>
          <IconButton edge="start" onClick={handleAccountOpen}  className={classes.menuIcon} color="inherit" aria-label="menu">
              <AccountCircle className={classes.accountCirleIcon} />
              </IconButton>
              <Menu keepMounted anchorEl={anchorProfileEl} open={Boolean(anchorProfileEl)} onClose={handleAccountClose}>
                    <MenuItem>
                     <Button onClick={handleAccount} color="inherit" className={classes.menuButton}>Profile </Button>
                  </MenuItem>
                  <MenuItem>
                  <Button className={classes.appbarMenu} onClick={handleLogout}>Logout</Button> 
            </MenuItem>
              </Menu>
        </Toolbar>      
        </AppBar>
        <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
      <div className={classes.toolbar}>
          <IconButton onClick={handleMenuClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider/>
        <MainNavProfile/>
        <Divider />
        <MainNavList/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container minWidth="lg">
          {props.children}
        </Container>
        
      </main>
      </div>
    );
  }

  MenuAppBar.propTypes = {
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.node
  }

const mapStateToProps = createStructuredSelector({
    
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(authActions, dispatch)
  },
  nav: {
    push: function() {
      return dispatch(push.apply(this, arguments))
    },
    replace:function() {
      return dispatch(replace.apply(this, arguments))
    },
  }
};
}
  
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default compose(
  withAuth,
  withRouter,
  withConnect
)(MenuAppBar);