import React, { useState, useEffect }  from 'react';

import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import * as authActions from "../../redux/actions/authActions";

import * as authSelectors from "../../redux/selectors/authSelector";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
       fontSize:"12px"  , 
    
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

const HomePage = (props) => {

    const {currentUser} = props;

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

        <div>
        <Container className={classes.container}>
            <Grid container item xs={12}>
                <Paper className={classes.paper}>
                    <Grid item xs ={3}>
                        <h2>Status</h2>
                    </Grid>
                <Grid item xs={9}>
                    
                </Grid>
                </Paper>
            </Grid>
            <Grid container item xs={12}>
                <Paper className={classes.paper}>
                    <Grid item xs ={3}>
                        <h2> Relationships</h2>
                    </Grid>
                <Grid item xs={9}>
                    
                </Grid>
                </Paper>
            </Grid>
        </Container>
    </div>
    
   );
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
)(HomePage);