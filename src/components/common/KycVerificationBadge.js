import React, {useState, useEffect} from "react";


import {Paper,Grid, Typography,Button, Fab, IconButton} from '@material-ui/core';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import BlockIcon from '@material-ui/icons/Block';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
     
      
    },
    container:{
       fontSize:"12px"  , 
    },

    fab:{
        fontSize:"8px"  , 
        padding: theme.spacing(2),
        background:"red",
        color:"white",
    },
    extendedIcon :{
        marginRight: theme.spacing(1),
    }
}));


const KycVerificationBadge = props => {
    const classes = useStyles();


    return (
        <ErrorIcon />

    )
}

export default KycVerificationBadge;