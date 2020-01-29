import React, { useState, useEffect }  from 'react';

import { withRouter } from 'react-router-dom';
import { push, replace } from 'connected-react-router';

import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Typography, CssBaseline } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountSelectors from "../../redux/selectors/accountSelector";
import * as accountActions from "../../redux/actions/accountActions";

import * as inviteSelectors from "../../redux/selectors/invitationSelector";
import * as inviteActions from "../../redux/actions/invitationActions";

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

const InvitePage = (props) => {

    const classes = useStyles();

    const {currentAccount, getTargetInvites} = props;

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
        props.actions.getTargetInvites(currentAccount.id);
        props.actions.getSourceInvites(currentAccount.id);
    },[])

    const goToAccountProfile = account => e => {     
        e.preventDefault();  
        props.actions.getAccountDetail(account);
        props.nav.push(`/accounts/detail/${account.id}`)    
    }

    return(

        <React.Fragment>
        <CssBaseline/>
        
        <Container className={classes.container}>
        <Grid container item xs={12}>
        {currentAccount && <CurrentAccountSlide account={currentAccount} goToAccountProfile={goToAccountProfile}  />}

        </Grid>
        <Paper className={classes.paper}>
            <Grid container item xs={12}>
                    <Grid item xs ={3}>
                        <Typography variant="subtitle1" component="p">
                            Pending
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Paper>
            <Grid container item xs={12}>
            <Paper className={classes.paper}>
            <Grid container item xs={12}>
                    <Grid item xs ={3}>
                        <Typography variant="subtitle1" component="p">
                            Requesting
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Paper>
            </Grid>
        </Container>
    </React.Fragment>
    
   );
}
InvitePage.propTypes = {
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
    currentUser: authSelectors.makeSelectCurrentUser(),
    currentAccount: accountSelectors.makeSelectAccount(),
    invite: inviteSelectors.makeSelectInvitation(),
    sourceInvites: inviteSelectors.makeSelectSourceInvitations(),
    isFetchingSourceInvites: inviteSelectors.makeSelectIsFetchingSourceInvitations(),
    sourceInvitesErrorMessage: inviteSelectors.makeSelectSourceInvitationsErrorMessages(),
    targetInvites: inviteSelectors.makeSelectTargetInvitations(),
    isFetchingTargetInvites: inviteSelectors.makeSelectIsFetchingTargetInvitations(),
    targetInvitesErrorMessage: inviteSelectors.makeSelectTargetInvitationsErrorMessages(),
    
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(accountActions, dispatch),
    ...bindActionCreators(inviteActions, dispatch)
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
)(InvitePage);