import React, {useState,useEffect} from "react";

import {Paper,Grid, Typography,Button} from '@material-ui/core';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import KycVerificationBadge from "./KycVerificationBadge";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
     
      
    },
    container:{
       fontSize:"12px"  , 
    },

    paper:{
        margin:theme.spacing(3,0,2),
        padding: theme.spacing(2),
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



const CurrentAccountSlide = props => {

    const {account,goToAccountProfile} = props;
    const classes = useStyles();

    return (
    <React.Fragment>
    {account && 
        <Paper className={classes.paper}>
                <Grid container item xs={12}>
                    <Grid item xs={2}>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/500" onClick={goToAccountProfile(account)}  />
                </Grid>
                <Grid item xs={2}>
                    <KycVerificationBadge />
                </Grid>
                <Grid item xs={3}>
                <Typography variant="subtitle1">
                            {account.name}
                        </Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant="subtitle2">
                            {account.wallets[0].did}
                     </Typography>
                </Grid>
                  
                </Grid>
                </Paper>
                }
    </React.Fragment>
    )
}



export default CurrentAccountSlide;