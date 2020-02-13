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
import { CircularProgress, Container, Typography, CssBaseline, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountSelectors from "../../redux/selectors/accountSelector";
import * as accountActions from "../../redux/actions/accountActions";

import * as inviteSelectors from "../../redux/selectors/invitationSelector";
import * as inviteActions from "../../redux/actions/invitationActions";

// todo
import * as credActions from "../../redux/actions/kycActions";
import * as credSelectors from "../../redux/selectors/kycSelectors";

import CurrentAccountSlide from "../common/CurrentAccountSlide";
import InvitesTable from './InvitesTable';
import CredsTable from "./CredsTable";


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
        height:"100%"    ,
        width:"100%",
        overflow:"scroll"
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

    const {currentAccount, sourceInvites,targetInvites, isFetchingTargetInvites, isFetchingSourceInvites,
        isGettingOffers, offers, offersError} = props;

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
        if(currentAccount != null){
            props.actions.getTargetInvites(currentAccount.id);
            props.actions.getSourceInvites(currentAccount.id);
            props.actions.getKycCredentialOffers(currentAccount.id);
        }
       
    },[]);

    const handleRefresh = (e) => {
        e.preventDefault();
        if(currentAccount != null) {
            props.actions.getTargetInvites(currentAccount.id);
            props.actions.getSourceInvites(currentAccount.id);
            props.actions.getKycCredentialOffers(currentAccount.id);
        }
       
    }

    const handleReject = invitationid => e => {
        e.preventDefault();
        props.actions.rejectInvite(invitationid, currentAccount.id);
    }

    const handleAccept = invitation => e => {
        e.preventDefault();
        props.actions.acceptInvite(invitation, currentAccount);
    }

    return(

        <React.Fragment>
        <CssBaseline/>
        
        <Container className={classes.container}>
        <Grid container item xs={12}>
                <Paper className={classes.paperHeader}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h5">
                                Inbox
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={handleRefresh} variant="contained" color="primary">Refresh</Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
        <Grid container item xs={12}>
        
            <Paper className={classes.paper}>
            {isFetchingSourceInvites == true || isFetchingTargetInvites == true ?
                         <CircularProgress/> :
                            <InvitesTable  
                            sourceInvites={sourceInvites} 
                            targetInvites={targetInvites}
                            handleReject={handleReject}
                            handleAccept={handleAccept}
                            />}
                </Paper>
        </Grid>
        <Grid container item xs={12}>
            <Paper className={classes.paper}>
            {isGettingOffers == true  ?
                         <CircularProgress/> :
                            <CredsTable  
                            offers={offers} 
                            
                            />}
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
    history: PropTypes.object,
    offers: PropTypes.object,
    offersError: PropTypes.string,
    isGettingOffers: PropTypes.bool
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
    offers: credSelectors.makeSelectOffers(),
    isGettingOffers: credSelectors.makeSelectIsGettingOffers(),
    offersError: credSelectors.makeSelectOffersMessage()
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(accountActions, dispatch),
    ...bindActionCreators(inviteActions, dispatch),
    ...bindActionCreators(credActions, dispatch)
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