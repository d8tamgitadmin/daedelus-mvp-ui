import React, { useState, useEffect }  from 'react';

import { withRouter } from 'react-router-dom';
import { push, replace } from 'connected-react-router';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { withAuth } from '@okta/okta-react';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import { Container,Paper, Grid, Typography, CssBaseline ,Button} from '@material-ui/core';


import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountActions from "../../redux/actions/accountActions";
import * as accountSelectors from "../../redux/selectors/accountSelector";

import AccountsList from "./AccountsList";
import ShowLinked from "./ShowLinked";
import SearchBar from "./SearchBar";
import CurrentAccountSlide from "../common/CurrentAccountSlide";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      padding:theme.spacing(2)
    },
    container:{
       fontSize:"12px"  , 
    
    },
    heroContent:{
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(4),
    },
    paper:{
        margin:theme.spacing(3, 0),
        padding:theme.spacing(2),
        background:"white",
        height:"10vh"    ,
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

const SearchPage = props => {

    const {currentUser,accounts, isFetchingAccounts, accountsMessage,currentAccount} = props;
    const classes = useStyles();

    const [state, setState] = useState({
        authenticated:null,        
    });

    const [showLinked, setShowlinked] = useState(true);
    const [nameFilter, setNameFilter] = useState(null);

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

    const goToAccountProfile = account => e => {     
        e.preventDefault();  
        props.actions.getAccountDetail(account);
        props.nav.push(`/accounts/detail/${account.id}`)    
    }

    const handleCreateLink = (account, targetAccount)  => {
       console.log(account);
       console.log(targetAccount);
       props.actions.createAccountLink(account, targetAccount);
        
    }

    useEffect(() => {
        checkAuthentication();       
        props.actions.getPublicAccounts();
    },[]);

    const handleRefresh = e => {
        e.preventDefault();

    }


    return (
        <React.Fragment>
        <CssBaseline/>
            <div className={classes.heroContent}>
                <Grid container maxWidth="sm">
                    <Grid xs={8} item>
                        <Typography variant="subtitle1" align="left" color="textPrimary" gutterBottom>
                        Linked Free Zone Members
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                    </Grid>
                    <Grid xs={2} item>
                    <Button variant="outlined" color="secondary" onClick={handleRefresh} >Refresh</Button>
                    </Grid>
                </Grid>
            </div>
            <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container item xs={12}>
                    
                    <Grid item xs={9}>
                        <SearchBar nameFilter={nameFilter} setNameFilter={setNameFilter}/>
                    </Grid>
                    <Grid item xs={3}>
                         <ShowLinked value={showLinked} setValue={setShowlinked}/>
                    </Grid>
                   
                </Grid>
                </Paper>
                <Grid container item xs={12}>
                    <AccountsList 
                    isFetching={isFetchingAccounts} 
                    accounts={accounts} 
                    showLinked={showLinked}
                    filter={nameFilter}
                    currentAccount={currentAccount}
                    goToAccountProfile={goToAccountProfile}
                    handleCreateLink={handleCreateLink}
                    />
                </Grid>
            </Container>
        </React.Fragment>
    )
}

SearchPage.propTypes = {
    currentUser: PropTypes.object,
    currentAccount: PropTypes.object,
    accounts: PropTypes.array,
    isFetchingAccounts: PropTypes.bool.isRequired,
    accountsMessage: PropTypes.object,
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
    currentUser: authSelectors.makeSelectCurrentUser(),
    currentAccount: accountSelectors.makeSelectAccount(),
    accounts: accountSelectors.makeSelectPublicAccounts(),
    isFetchingAccounts: accountSelectors.makeSelectIsFetchingPublicAccounts(),
    accountsMessage: accountSelectors.makeSelectPublicAccountsMessage()
});

const mapDispatchToProps = (dispatch) => {
    return {
        actions:{
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
    }
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    withAuth,
    withRouter,
    withConnect
)(SearchPage);