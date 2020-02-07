import React, {useEffect, setState} from "react";


import {Paper,Grid, Typography,Button, Fab, Badge} from '@material-ui/core';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import KycVerificationBadge from "./KycVerificationBadge";



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1),
      width:"100%",
      background:"darkgray",
      fontSize:"10px"
    },
    container:{
       fontSize:"12px"  , 
    },

    paper:{
        
        
        background:"black",
        color:"white",
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



const CurrentAccountAppBar = (props) => {

    const classes = useStyles();


    const {goToAccountProfile,account} = props;
    
    return (account != null &&  
        <Fab variant="extended" className={classes.root}>
                <Grid container >
               
                    <Grid item xs={2}>
                        <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/500" onClick={goToAccountProfile(account)}  />
                    </Grid>
                    <Grid item xs={2}>
                        {account.name}
                    </Grid>
                    <Grid item xs={6}>
                    DID: {account.wallets != null && account.wallets.length > 0 &&  account.wallets[0].did}
                    </Grid>
                    <Grid item xs={2}>
                        <KycVerificationBadge />
                    </Grid>
                   
               </Grid>
              </Fab> 
      
    )
}

export default CurrentAccountAppBar;