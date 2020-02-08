import React,  {useState, useEffect} from "react";
import clsx from 'clsx';

import { withRouter } from 'react-router-dom';
import { push, replace } from 'connected-react-router';

import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountActions from "../../redux/actions/accountActions";
import * as accountSelectors from "../../redux/selectors/accountSelector";

import * as invitationActions from "../../redux/actions/invitationActions";
import * as invitationSelectors from "../../redux/selectors/invitationSelector";

import { makeStyles, fade } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, InputBase,Menu, MenuItem, Paper, Grid, CircularProgress,
Typography, Button, Avatar} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';

import CreateLinkModule from "./CreateLinkModule";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    MenuItem:{
      width:"500px",
      margin: theme.spacing(1),
    },
    SearchAppbarDisplay:{
      marginTop:"50px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },    
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
  }));



const SearchAppBar = props => {

    const {isFetching, accounts, currentAccount,showLinked, filter} = props;
    const [anchorSearchBarEl, setanchorSearchBarEl] = useState(false);
    const [nameFilter, setNameFilter] = useState(null);

    const classes = useStyles();

    useEffect(() => {
        props.actions.getPublicAccounts();
    },[]);


    const handleChange =  e => {
      e.preventDefault();
      setNameFilter(e.target.value);
      setanchorSearchBarEl(e.currentTarget);
    }


    const goToAccountProfile = account => e => {     
      e.preventDefault();  
      props.actions.getAccountDetail(account);
      props.nav.push(`/accounts/detail/${account.id}`)    
    };

    const handleCreateLink = (account, targetAccount)  => {
      console.log(account);
      console.log(targetAccount);
      props.actions.createAccountLink(account, targetAccount);
       
   }

    return (
        <div className={classes.search} >
          <InputBase
            id="outlined-adornment-amount"
            value={nameFilter}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
               <SearchIcon />
              </InputAdornment>
            }
            placeholder="Search Free Zone Members"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            labelWidth={60}
          />
          <br/>
            <Menu className={classes.SearchAppbarDisplay} keepMounted anchorEl={anchorSearchBarEl} open={Boolean(anchorSearchBarEl)} onClose={() =>setanchorSearchBarEl(null)}>
            {isFetching ? <CircularProgress/> :
          accounts && accounts
          .filter(account => currentAccount != null && account.id !== currentAccount.id)
          .filter(account => nameFilter == null? true: account.name.includes(nameFilter))
          .map((account,i) => (
             <MenuItem >
                <Grid key={account.id} className={classes.MenuItem} container item xs={12}>
                    <Grid item xs={2}>
                      <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/500" onClick={goToAccountProfile(account)}  />
                  </Grid>
                <Grid item xs={6}>
                <Typography variant="subtitle1">
                            {account.wallets && account.wallets.length > 0 ? account.wallets[0].did : account.name}
                        </Typography>
                </Grid>
                <Grid item xs={3}>
                <CreateLinkModule 
                currentAccount={currentAccount}
                 targetAccount={account}
                 handleCreateLink={handleCreateLink}
                 />
                </Grid>

                  
                </Grid>
               
                </MenuItem>
            ))
        }    
            </Menu>
          </div>
    )

}

SearchAppBar.propTypes = {
  currentUser: PropTypes.object,
  currentAccount: PropTypes.object,
  accounts: PropTypes.array,
  isFetchingAccounts: PropTypes.bool.isRequired,
  accountsMessage: PropTypes.object,
  classes: PropTypes.object,
  match:PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

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
          ...bindActionCreators(accountActions, dispatch),
          ...bindActionCreators(invitationActions,dispatch)
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
  withRouter,
  withConnect
)(SearchAppBar);