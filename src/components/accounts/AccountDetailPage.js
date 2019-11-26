import React, { useState, useEffect }  from 'react';
import { withRouter, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push, replace } from 'connected-react-router';
import { compose, bindActionCreators } from 'redux';

import { withAuth } from '@okta/okta-react';

import Button from '@material-ui/core/Button';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import * as selectors from "../../redux/selectors/accountSelector";
import * as accountActions from "../../redux/actions/accountActions";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
      },
      paper: {
        padding: theme.spacing(4),
        textAlign: 'left',
        color: theme.palette.text.secondary
      },
      container:{
          width:"80vw"
      }

}));



const AccountDetailPage = (props) => {
    const classes = useStyles();
    const {account} = props;
    console.log(account)
    
    return (
        <div className={classes.root}>
        <Container className={classes.container} maxWidth="lg" fixed>
            <Grid container>
                <Grid item xs={12}>    
                    <Paper className={classes.paper}>  
                        <Typography color={"primary"} variant="h5" component="h3">
                            Account Detail
                        </Typography>  
                    </Paper>
                </Grid> 
            </Grid>
            {account && 
            <React.Fragment>
            <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid item container>                   
                            <Grid item xs={3}>
                                <Typography component="p">
                                    {account.name}        
                                </Typography>    
                            </Grid>
                            <Grid item xs={3}>
                                <Typography component="p">
                                    {account.accountType}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography component="p">
                                    {account.visibilityType}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography component="p">
                                {account.created.split('T')[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                    <Typography color={"primary"} component="h5">
                           Members
                            </Typography>  
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                    
                            <Grid item xs={4}>
                            <Typography component="p">
                                User       
                                </Typography>     
                            </Grid>
                            <Grid item xs={4}>
                                Permissions
                            </Grid>
                            <Grid item xs={4}>
                                Assigned
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
                {account && account.accountPermissions.map(ap => (
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                    
                            <Grid item xs={4}>
                            <Typography component="p">
                                {ap.userId}           
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {ap.permissionType}
                            </Grid>
                            <Grid item xs={4}>
                                {ap.modified.split('T')[0]}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                ))}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                    <Typography color={"primary"} component="h3">
                           Wallets
                            </Typography>  
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                            <Grid item xs={3}>
                            <Typography  component="h4">
                            Agent    
                            </Typography>
                                      
                            </Grid>
                            <Grid item xs={3}>
                                WalletId
                            </Grid>
                            <Grid item xs={3}>
                                WalletKey
                            </Grid>
                            <Grid item xs={3}>
                                Created
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
                {account && account.wallets.map(wallet => (
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>                   
                            <Grid item xs={3}>
                            <Typography component="p">

                                {wallet.agent}  
                                </Typography>                      
                            </Grid>
                            <Grid item xs={3}>
                            <Typography component="p">
                                {wallet.walletId}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                            <Typography component="p">                            
                                {wallet.walletKey}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                            <Typography component="p">
                                {wallet.created.split('T')[0]}
                                </Typography>
                            </Grid>
                           
                        </Grid>
                    </Paper>
                </Grid>
                ))}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                    <Typography color={"primary"} component="h5">
                           Addresses
                            </Typography>  
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                    
                            <Grid item xs={2}>
                            <Typography  component="p">
                                Address         
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                            
                                City
                            </Grid>
                            <Grid item xs={2}>
                                State
                            </Grid>
                            <Grid item xs={2}>
                                Zip
                            </Grid>
                            <Grid item xs={2}>
                                Country
                            </Grid>
                            <Grid item xs={2}>
                                Created
                            </Grid>
                          
                        </Grid>
                    </Paper>
                </Grid>
                {account && account.addresses.map(address => (
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={2}>
                        <Typography component="p">
                                {address.address1}         
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                            {address.city}        
                            </Grid>
                            <Grid item xs={2}>
                            {address.state}      
                            </Grid>
                            <Grid item xs={2}>
                            {address.zip}      
                            </Grid>
                            <Grid item xs={2}>
                            {address.country}      
                            </Grid>
                            <Grid item xs={2}>
                            {address.created.split('T')[0]}
                            </Grid>
                             
                        </Grid>
                    </Paper>
                </Grid>
                ))}
                
                </React.Fragment>
                }
        </Container>
        </div>
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
  )(AccountDetailPage);