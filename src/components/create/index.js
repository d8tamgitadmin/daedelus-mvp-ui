import React, { useState }  from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import AddressForm from "./AddressForm";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        backgroundColor:"white"
      },
      paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      wrapper:{
          backgroundColor:"white"
      }, submit: {
        margin: theme.spacing(3, 0, 2),
      },
   
  }));
  

export default function Create() {
    const classes = useStyles();
    const [count, setCount] = useState(0);

 
            return (
        <div className={classes.layout}>
        
         <Paper className={classes.paper}>
        <Grid container xs={10}>
        <AddressForm/>
        </Grid>
        </Paper>
            </div> )
    }


