import React, {useState, useEffect} from "react";


import {Paper,Grid, Typography,Button, Fab} from '@material-ui/core';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
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
    extendedIcon :{
        marginRight: theme.spacing(1),
    }
}));


const KycVerificationBadge = props => {
    const classes = useStyles();


    return (
        <React.Fragment>
             <Fab variant="extended">
                <BlockIcon className={classes.extendedIcon} />
                Not Verified
            </Fab>
        </React.Fragment>
    )
}

export default KycVerificationBadge;