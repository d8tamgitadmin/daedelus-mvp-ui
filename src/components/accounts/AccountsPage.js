import React, { useState, useEffect }  from 'react';

import { withRouter, Link } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push, replace } from 'connected-react-router';

import { withAuth } from '@okta/okta-react';

import * as accountActions from "../../redux/actions/accountActions";
import * as selectors from "../../redux/selectors/accountSelector";

import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import Button from '@material-ui/core/Button';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CreateAccountModule from "./CreateAccountModule";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
      },
      paper: {
        padding: theme.spacing(4),
        textAlign: 'left',
        color: theme.palette.text.secondary
      },

}));

const AccountsPage = (props) => {

    const { account, currentUser, userAccounts, isFetchingUserAccounts } = props;
    const classes = useStyles();
    const [state, setState] = useState({
        authenticated:null,    
        route:false
    });
   
    const onSubmit = account => {
       
        alert('bullshit')
        // save 
    }

    const goToDetail = account => e => {       
        props.actions.getAccountDetail(account);
        props.nav.push(`/accounts/detail/${account.id}`)    
        setState({...state,route:true})
    }

    useEffect(() => {
        props.actions.getUserAccounts(currentUser.id);
    },[])

    return(
        <div className={classes.root}>
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>    
                    <Paper className={classes.paper}>            
                        <h2>Accounts</h2>
                        <CreateAccountModule account={account} onSubmit={onSubmit}/>
                    </Paper>
                </Grid>  
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                            <Grid item xs={1}>
                                
                            </Grid>
                            <Grid item xs={3}>
                            Name
                            </Grid>
                            <Grid item xs={2}>
                             Type
                            </Grid>
                            <Grid item xs={3}>
                             Is Visible
                            </Grid>
                            <Grid item xs={3}>
                                Created
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                {isFetchingUserAccounts == true ?  
                    <Paper className={classes.paper}>                
                       <CircularProgress/>
                    </Paper>
                    :
                   <>
                        {userAccounts && userAccounts.map(userAccount => (
                            <Paper className={classes.paper}>            
                                <Grid container spacing={4}>
                                        <Grid item xs={1}>
                                            <Button onClick={goToDetail(userAccount)} color="inherit"><MoreVertIcon/></Button>
                                        </Grid>
                                        <Grid item xs={3}>
                                        {userAccount.name}                                       
                                        </Grid>
                                        <Grid item xs={2}>
                                            {userAccount.accountType}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {userAccount.visibilityType}
                                        </Grid>
                                        <Grid item xs={3}>
                                            {userAccount.created.split('T')[0]}
                                        </Grid>
                                </Grid>
                            </Paper>
                        ))}
                  </>
                }  
                </Grid>
            </Grid>
            </Container>      
        </div>
        )    
}
                

AccountsPage.propTypes = {
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    currentUser: PropTypes.object,
    userAccounts: PropTypes.object,
    isFetchingUserAccounts: PropTypes.bool,
    account: PropTypes.object
};


const mapStateToProps = createStructuredSelector({
   currentUser: authSelectors.makeSelectCurrentUser(),
   userAccounts: selectors.makeSelectUserAccounts(),
   isFetchingUserAccounts: selectors.makeSelectIsFetchingUserAccounts(),
   account: selectors.makeSelectAccount(),
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(accountActions, dispatch)
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
)(AccountsPage);