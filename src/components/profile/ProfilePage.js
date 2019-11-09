import React, {useEffect, useState} from 'react';
import { NavLink, withRouter } from "react-router-dom";

import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authActions from "../../redux/actions/authActions";

import { createStructuredSelector } from 'reselect';
import * as authSelectors from "../../redux/selectors/authSelector";


import { withAuth } from '@okta/okta-react';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
        height: '90vh',
       
    },
    paper:{
        background:'white'
    }
}));

const ProfilePage = (props) => {

    const {currentUser} = props;

    const classes = useStyles();

    const [state, setState] = useState({
        authenticated:null,
        currentUser:null
    });

   

    const checkAuthentication = async () =>{
        const auth = await props.auth.isAuthenticated();
        if (auth !== state.authenticated) {
        
          const currentUser = await props.auth.getUser();
          setState({ authenticated:auth,
            currentUser:currentUser
         });
         props.actions.createUserSuccess(currentUser);
        }
    }

    useEffect(() => {
        checkAuthentication();
    })

    return ( 
        <Container fixed className={classes.container}>
        {
            !currentUser ? 
                <CircularProgress/>
           :<Paper className={classes.paper}>
                <Grid container >
                <Grid item>
                <h3> Profile </h3>
                </Grid>
                <Grid container item xs={12}>
                   
                    <Grid item xs={12}>
                            { currentUser.sub}
                    </Grid>
                    <Grid item xs={12}>
                        {currentUser.email}
                    </Grid>
                    <Grid item xs={12}>
                    {currentUser.given_name}
                    </Grid>
                    <Grid item xs={12}>
                    {currentUser.family_name}
                    </Grid>
                    <Grid item xs={12}>
                    {currentUser.locale}
                    </Grid>
                    <Grid item xs={12}>
                    {currentUser.zoneinfo}
                    </Grid>
                    <Grid item xs={12}>
                    {currentUser.updated_at}
                    </Grid>
                </Grid>
                </Grid>
           </Paper>}
        </Container>
    )
}

ProfilePage.propTypes = {
    currentUser: PropTypes.object,
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
}


  const mapStateToProps = createStructuredSelector({
      currentUser: authSelectors.makeSelectCurrentUser(),
  });

const mapDispatchToProps =  (dispatch) => {
  return {
    actions: {
      ...bindActionCreators(authActions, dispatch)
    },
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
  )(ProfilePage);