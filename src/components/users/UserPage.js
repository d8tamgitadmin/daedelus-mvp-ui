import React, { useState, useEffect }  from 'react';

import { push, replace } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {CircularProgress,Container,Paper, Grid, Typography, Button, CssBaseline} from '@material-ui/core';


import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountActions from "../../redux/actions/accountActions";
import * as accountSelectors from "../../redux/selectors/accountSelector";

import CurrentAccountSlide from "../common/CurrentAccountSlide";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
       fontSize:"12px"  , 
    
    },

    paper:{
        margin:theme.spacing(3),
        padding: theme.spacing(3),
        background:'white',
        height:"150px"    ,
       
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        "background":"gray",
        "color":"black",
        '&:hover': {
          backgroundColor: 'darkgray !important',
        },
      },
}));

const UserPage = (props) => {

    const {currentUser, currentAccount} = props;

    const classes = useStyles();

    const [state, setState] = useState({
        authenticated:null,
        
    });

    const checkAuthentication = async () =>{
        const auth = await props.auth.isAuthenticated();
        if (auth !== state.authenticated) {
        
            if(currentUser == null){
                const currentUser = await props.auth.getUser();
                setState({ authenticated:auth,
                  currentUser:currentUser
               });
               props.actions.oktaLoginSuccess(currentUser);
            }
         
        }
    }


    useEffect(() => {
        checkAuthentication();       
    })

    return(

        <React.Fragment>
        <CssBaseline/>
            <div className={classes.heroContent}>
                <Grid container maxWidth="sm">
                    <Grid xs={8} item>
                        <Typography variant="subtitle1" align="left" color="textPrimary" gutterBottom>
                        Manage Account Users
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                    </Grid>
                    <Grid xs={2} item>
                    </Grid>
                </Grid>
            </div>
        <Container className={classes.container}>
            <Grid container item xs={12}>
                <Grid item xs ={6}>
                    <Paper className={classes.paper}>
                        <h2>Status</h2>
                    </Paper>
                </Grid>
                <Grid item xs ={6}>
                    <Paper className={classes.paper}>
                        <h2> Links</h2>
                    </Paper>
                </Grid>
                <Grid item xs ={6}>
                    <Paper className={classes.paper}>
                        <h2> Invites</h2>
                    </Paper>
                </Grid>
                <Grid item xs ={6}>
                    <Paper className={classes.paper}>
                        <h2> KYC</h2>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>
    
   );
}

UserPage.propTypes = {
    currentUser: PropTypes.object,
    currentAccount: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
    currentUser: authSelectors.makeSelectCurrentUser(),
    currentAccount: accountSelectors.makeSelectAccount()
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(accountActions, dispatch)
  },nav: {
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
)(UserPage);