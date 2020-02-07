import React, { useState, useEffect }  from 'react';
import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push, replace } from 'connected-react-router';
import { compose, bindActionCreators } from 'redux';

import { withAuth } from '@okta/okta-react';

import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Typography, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import * as selectors from "../../redux/selectors/accountSelector";
import * as accountActions from "../../redux/actions/accountActions";

import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import AccountAddresses from "./AccountAddresses";
import AccountMembers from "./AccountMembers";
import AccountWallets from "./AccountWallets";
import Title from '../common/Title';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
      },
      content:{
          flexGrow:1,
          height:'100vh',
          overflow:'auto'
      },
      title:{
          flexGrow:1,
      },
      container:{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
      },
      paper: {
       padding: theme.spacing(2),
       display:'flex',
       overflow:'auto',
       flexDirection:'column'
      },
      container:{
          width:"80vw"
      },
      fixedHeight:{
          height:240
      }

}));



const AccountDetailPage = (props) => {
    const classes = useStyles();
    const {account, currentUser} = props;
    console.log(account)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const goToDetail = account => e => {       
        // this also sets it as the current account
        props.actions.getAccountDetail(account.id,currentUser.id);
    }

    const handleAccountDelete = account => e =>{
        e.preventDefault();
        props.actions.deleteAccount(account.id, currentUser.id);
        props.nav.push(`/accounts`)    
    }
    
    
    return (
        <React.Fragment>
        {account &&             
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={classes}>
                    <Title>Account Details</Title>
                    <Typography gutterBottom variant="subtitle1">
                            {account.accountType}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            {account.visibilityType}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                        {account.created.split('T')[0]}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                        <Button variant="contained" color="primary" onClick={goToDetail(account)}>
                                            Set As Current</Button>
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                        <Button variant="outlined" color="secondary" onClick={handleAccountDelete(account)}>
                                            Delete Account</Button>
                        </Typography>
                       
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <AccountMembers accountPermissions={account.accountPermissions}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <AccountWallets wallets={account.wallets}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <AccountAddresses addresses={account.addresses}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>            
        </Grid>}
       </React.Fragment>
    );
}

AccountDetailPage.propTypes = {
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    currentUser: PropTypes.object,
    account: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    account: selectors.makeSelectAccount(),
    currentUser: authSelectors.makeSelectCurrentUser()
 });
 
 const mapDispatchToProps =  (dispatch) => {
 return {
   actions: {
     ...bindActionCreators(accountActions, dispatch),
     ...bindActionCreators(authActions, dispatch),
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
  )(AccountDetailPage);