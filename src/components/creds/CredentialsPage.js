import React, { useState, useEffect }  from 'react';

import { withRouter } from 'react-router-dom';
import { push, replace } from 'connected-react-router';


import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountActions from "../../redux/actions/accountActions";
import * as accountSelectors from "../../redux/selectors/accountSelector";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Typography, Button, Paper, Grid } from '@material-ui/core';


import CurrentAccountSlide from "../common/CurrentAccountSlide";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
       fontSize:"12px"  , 
    
    },
    paperHeader: {
        width:"80vw",
        background:'white',
        margin:theme.spacing(3, 0, 2),
        padding: theme.spacing(2)
    },
    paper:{
        margin:theme.spacing(3, 0, 2),
        background:'white',
        height:"30vh"    ,
        width:"80vw"
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

const CredentialsPage = (props) => {

    const {currentAccount} = props;
    const classes = useStyles();

    const [state, setState] = useState({
        authenticated:null,
        
    });

    const checkAuthentication = async () =>{
        const auth = await props.auth.isAuthenticated();
        if (auth !== state.authenticated) {
          setState({ authenticated:auth});
        }
    }

    useEffect(() => {
        checkAuthentication();
    })



    return(

        <React.Fragment>
        <Container className={classes.container}>
            <Grid container item xs={12}>
                <Paper className={classes.paperHeader}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h5">
                                Onboarding
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={3}>
                        <Button variant="contained" color="primary" >
                            KYC Account
                        </Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
            <Grid container item xs={12}>
                <Paper className={classes.paper}>
                <Grid container item xs={12}>
                <Grid item xs={4}>
                        <Typography variant="subtitle1" component="h4">
                            Accounts In Progress
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        
                    </Grid>
                </Grid>
                  
                </Paper>
            </Grid>
        </Container>
    </React.Fragment>
    
   );
}

CredentialsPage.propTypes = {
    currentUser: PropTypes.object,
    currentAccount: PropTypes.object
};

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
)(CredentialsPage);