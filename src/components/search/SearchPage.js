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

import * as invitationActions from "../../redux/actions/invitationActions";
import * as invitationSelectors from "../../redux/selectors/invitationSelector";

import * as kycSelectors from "../../redux/selectors/kycSelectors";
import * as kycActions from "../../redux/actions/kycActions";

import AccountLinksList from "./AccountLinksList";
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

    const {currentUser,accountLinks, isFetchingAccounts,accounts,schemaDefinitions, account} = props;
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



    useEffect(() => {
        checkAuthentication(); 
        if(account) {
            props.actions.getAccountLinks(account.id)      
        }
       
    },[]);

    const handleRefresh = e => {
        e.preventDefault();
        if(account) {
            props.actions.getAccountLinks(account.id)      
        }
    }

    const onSubmitCredKycOffer = (offer,currentAccount) => {
        props.actions.createKycSchemaDefinitionOffer(offer,currentAccount);
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
                <Grid container item xs={12}>
                    <AccountLinksList 
                    currentAccount={account}
                    accounts={accounts}
                    schemaDefinitions={schemaDefinitions}
                    onCredOfferSubmit={onSubmitCredKycOffer}
                    isFetching={isFetchingAccounts} 
                    accountLinks={accountLinks} 
                    />
                </Grid>
            </Container>
        </React.Fragment>
    )
}

SearchPage.propTypes = {
    currentUser: PropTypes.object,
    currentAccount: PropTypes.object,
    accountLinks: PropTypes.object,
    isFetchingAccounts: PropTypes.bool.isRequired,
    accountsMessage: PropTypes.object,
    schemaDefinitions: PropTypes.object,
    accounts: PropTypes.object,
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
    currentUser: authSelectors.makeSelectCurrentUser(),
    account: accountSelectors.makeSelectAccount(),
    accountLinks: invitationSelectors.makeSelectAccountLinks(),
    isFetchingAccounts: invitationSelectors.makeSelectIsFetchingAccountLinks(),
    accountsMessage: accountSelectors.makeSelectPublicAccountsMessage(),
    schemaDefinitions: kycSelectors.makeSelectSchemaDefinitions(),
    accounts: accountSelectors.makeSelectPublicAccounts()
});

const mapDispatchToProps = (dispatch) => {
    return {
        actions:{
            ...bindActionCreators(authActions, dispatch),
            ...bindActionCreators(accountActions, dispatch),
            ...bindActionCreators(invitationActions, dispatch),
            ...bindActionCreators(kycActions, dispatch)

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