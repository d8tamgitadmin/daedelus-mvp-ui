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
import { CircularProgress, Container, Typography, CssBaseline, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CreateAccountModule from "./CreateAccountModule";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 2,
      },
      heroContent:{
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(4),
        textAlign: 'left',
        color: theme.palette.text.secondary
      },
      cardGrid:{
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8)
      },
      card:{
          height:'100%',
          display:'flex',
          flexDirection:"column"
      },
      cardContent:{
          flexGrow:1
      },
      CardMedia:{
          paddingTop:'56.25%'
      },
      heroButtons:{
          marginTop:  theme.spacing(4)
      }
}));

const AccountsPage = (props) => {

    const { account, currentUser, userAccounts, isFetchingUserAccounts } = props;
    const classes = useStyles();
    const [state, setState] = useState({
        authenticated:null,    
        route:false
    });
   
    const onSubmit = account => {
    
       props.actions.createAccount(account);
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
        <React.Fragment>
            <CssBaseline/>
            <div className={classes.heroContent}>
                <Grid container maxWidth="sm">
                    <Grid xs={8} item>
                        <Typography component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
                            Accounts
                        </Typography>
                    </Grid>
                    <Grid xs={4} item>
                    <CreateAccountModule currentUser={currentUser} account={account} onSubmit={onSubmit}/>
                    </Grid>
                </Grid>
            </div>
            {isFetchingUserAccounts == true ?  
                <Paper className={classes.paper}>                
               <CircularProgress/>
            </Paper> 
            :
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {userAccounts && userAccounts.map(userAccount => (
                        <Grid item key={userAccount} xs={12} sm={6} md={4}>
                            <Card className={classes.card} onClick={goToDetail(userAccount)} >
                                <CardMedia
                                    className={classes.CardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Sample Account"/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {userAccount.name}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1">
                                            {userAccount.accountType}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {userAccount.visibilityType}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {userAccount.created.split('T')[0]}
                                        </Typography>
                                        
                                    </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container> } 
        </React.Fragment>
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