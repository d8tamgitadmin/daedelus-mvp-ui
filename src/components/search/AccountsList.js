import React, { useState, useEffect }  from 'react';

import { CircularProgress, Container, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import CreateLinkModule from "./CreateLinkModule";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
       fontSize:"12px"  , 
    
    },

    paper:{
        margin:theme.spacing(3,0,2),
        padding: theme.spacing(2),
        background:'white',
        height:"100%"    ,
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


const AccountsList = props => {

    const {isFetching, accounts, currentAccount,showLinked, filter,goToAccountProfile,handleCreateLink} = props;
    const classes = useStyles();

    return(
    <React.Fragment>
        {isFetching ? <CircularProgress/> :
          accounts && accounts
          .filter(account => currentAccount != null && account.id !== currentAccount.id)
          .filter(account => account.accountType === "Personal" || showLinked === true)
          .filter(account => filter == null? true: account.name.includes(filter))
          .map((account,i) => (
             
            <Paper className={classes.paper}>
                <Grid container item xs={12}>
                
                    
                    <Grid item xs={3}>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/500" onClick={goToAccountProfile(account)}  />
                </Grid>
                <Grid item xs={3}>
                <Typography variant="subtitle1">
                            {account.name}
                        </Typography>
                </Grid>
                <Grid item xs={3}>
                <Typography variant="subtitle2">
                            {account.accountType}
                        </Typography>
                </Grid>
                <Grid item xs={3}>
                { account.accountType === "Personal"? <CreateLinkModule 
                currentAccount={currentAccount}
                 targetAccount={account}
                 handleCreateLink={handleCreateLink} /> :  
                  <Button disabled variant="outlined">Linked</Button> }
             
                </Grid>
                  
                </Grid>
                </Paper>
            ))
        }
    </React.Fragment>)
};

export default AccountsList;