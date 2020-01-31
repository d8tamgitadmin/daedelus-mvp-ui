import React, { useState, useEffect }  from 'react';
import propTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push, replace } from 'connected-react-router';


import { withAuth } from '@okta/okta-react';


import * as poolActions from "../../redux/actions/poolActions";
import * as poolSelector from "../../redux/selectors/poolSelector";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography, Button, Paper, Container, Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white",
      
    },
    container:{
       fontSize:"12px", 
       
    },
    paperHeader: {
        width:"80vw",
        background:'white',
        margin:theme.spacing(3, 0, 2),
        padding: theme.spacing(2)
    },
    paper:{     
        margin: theme.spacing(3, 0, 2),
        background:'white',       
        height:"100%",
        width:"100%"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        "background":"darkgray",
        "color":"white",
        '&:hover': {
          backgroundColor: 'blue !important',
        },
      },
}));

const LedgerPage = (props)=> {

    const {isworking, result, error} = props;
    const classes = useStyles();
    const [state, setState] = useState({});

    const handleSeedPool = (e) => {
        e.preventDefault();
        props.actions.seedPool();
    }
    return (
    <Container fixed={true} maxWidth="md" className={classes.root}>
    
        <Grid container item xs={12}>
                <Paper className={classes.paperHeader}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h5">
                                Settings
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>

                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
    <Grid item container xs={12}>
            <Paper className={classes.paper}>
            {isworking == true ? <CircularProgress/> :
            <Grid item container xs={12}>
                    <Grid item container xs={3}>
                     
                     </Grid>
                    <Grid item container xs={3}>
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleSeedPool}
                            variant="contained"
                            color="primary"
                            className={classes.submit}>           
                            Seed Pool
                        </Button>
                    </Grid>
                    <Grid item container xs={6}>
                        {error} {result}
                    </Grid>
                </Grid>
                }
            </Paper>   
        </Grid>
    </Container>)
};

LedgerPage.propTypes = {   
    result: PropTypes.object,
    isworking: PropTypes.bool,
    errof: PropTypes.string,
    classes: PropTypes.object,   
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
  };
  

const mapStateToProps = createStructuredSelector({
    result: poolSelector.makeSelectPoolResult(),
    error: poolSelector.makeSelectPoolError(),
    isworking: poolSelector.makeSelectIsWorking()
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(poolActions, dispatch)
  },
  nav: {
    push: function() {
      return dispatch(push.apply(this, arguments))
    },
    replace:function() {
      return dispatch(replace.apply(this, arguments))
    },
  }
};
}


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default compose(
    withAuth,
    withRouter,
    withConnect
)(LedgerPage);
