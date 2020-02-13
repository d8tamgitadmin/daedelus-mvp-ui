import React, { useState, useEffect }  from 'react';

import { CircularProgress, Container, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import CreateLinkModule from "./CreateLinkModule";
import CredentialOfferModule from "../creds/CredentialOfferModule";


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

const AccountLinksList = props => {

    const {isFetching, accountLinks,accounts,currentAccount, schemaDefinitions,onCredOfferSubmit} = props;
    const classes = useStyles();

      
    return(
    <React.Fragment>
    <Paper className={classes.paper}>
                <Grid container item xs={12}>
                        <Grid item xs={1}></Grid>
                
                        <Grid item xs={9}>
                        Account Link Verkey
                        </Grid>
            <Grid item xs={2}>Action</Grid>
                  
                </Grid>
                </Paper>
        {isFetching ? <CircularProgress/> :
            accountLinks && accountLinks
           
          .map((linkedAccount) => (
             
            <Paper className={classes.paper}>
                <Grid container item xs={12}>
                 <Grid item xs={12}>
                    {() => {
                        let acc = accounts
                    .filter(account => account.id != currentAccount.id)
                    .filter(account => account.id == linkedAccount.firstAccountId || account.id == linkedAccount.secondAccountId)
                    [0];
                        return acc != null ? acc.name : "No Name";
                    }
                    }
                 </Grid>
                <Grid item xs={1}>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/500"  />
                </Grid>
                <Grid item xs={9}>
                {JSON.parse(linkedAccount.nymResponse).result.txn.data.verkey}
                </Grid>
            
                <Grid item xs={2}>
                <Button variant="contained" color="secondary"> Un-Link</Button>
             
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={2}>
                    <Typography component="subtitle2">
                        Proofs
                    </Typography>
                    </Grid>
                    <Grid item xs={10}>

                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs= {2}>
                             <CredentialOfferModule 

                            schemaDefinitions={schemaDefinitions} 
                            targetAccount={accounts
                                    .filter(account => account.id != currentAccount.id)
                                    .filter(account => account.id == linkedAccount.firstAccountId || account.id == linkedAccount.secondAccountId)
                                    [0]} 
                            onSubmit={onCredOfferSubmit}
                            />
                        </Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" color="primary"> Chat</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="primary"> Request KYC</Button>
                            </Grid>
                    </Grid>
                      
                    </Grid>
                  
                </Grid>
                </Paper>
            ))
        }
    </React.Fragment>)
};

export default AccountLinksList;