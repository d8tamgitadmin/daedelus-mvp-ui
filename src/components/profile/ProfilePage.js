import React, {useEffect, useState} from 'react';
import { NavLink, withRouter } from "react-router-dom";

import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authActions from "../../redux/actions/authActions";

import { createStructuredSelector } from 'reselect';
import * as authSelectors from "../../redux/selectors/authSelector";


import { withAuth } from '@okta/okta-react';

import { withStyles,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
       fontSize:"12px"       
    },

    paper:{
        background:'white'
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

const ProfilePage = (props) => {

    const {currentUser} = props;

    const classes = useStyles();

    const [state, setState] = useState({
        authenticated:null,
        working:true,
        errorMessage: null
    }); 
    
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
    })

    const submit = async (e) => {
        e.preventDefault();
        setState({
            ...state,
            working:true
        });

    }

    return ( 
        <Container fixed className={classes.container}>
        {
            !currentUser ? 
                <CircularProgress/>
           :<Paper className={classes.paper}>
                <Grid alignItems='center' container xs={12} >
                <form onSubmit={submit} className={classes.container} noValidate autoComplete="off">
                {state.errorMessage}
              
                <Grid container item spacing={2} xs={10}>    
                    <Grid xs={12} item>
                        <h3> <AccountCircle/> User Profile </h3>
                    </Grid> 
                <Grid xs={12} container item>
                    <Grid xs={2} >
                       
                    </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                           
                            margin="normal"            
                            value={currentUser.lastName+", "+ currentUser.firstName}                        
                            required
                            fullWidth
                            id="userName"
                            label="UserName"
                            name="userName"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid> 
                <Grid xs={12} container item>
                    <Grid xs={2} >
                       
                    </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                           
                            margin="normal"            
                            value={currentUser.isactive ==true ? "Yes" : "No"}                        
                            required
                            fullWidth
                            id="active"
                            label="Active"
                            name="active"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid> 
                <Grid xs={12} container item>
                    <Grid xs={2} >
                       
                    </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                           
                            margin="normal"            
                            value={currentUser.isDiscoverable ==true ? "Yes" : "No"}                        
                            required
                            fullWidth
                            id="Public"
                            label="Public"
                            name="Public"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid> 
                <Grid xs={12} container item>
                <Grid xs={2} >
                       
                       </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                         
                            margin="normal"            
                            value={currentUser.userName.substring(0,10)}                        
                            required
                            fullWidth
                            id="userName"
                            label="UserName"
                            name="userName"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid> 
                <Grid xs={12} container item>
                <Grid xs={2} >
                       
                       </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                          
                            margin="normal"            
                            value={currentUser.email}                        
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>    
                <Grid xs={12} container item>
                <Grid xs={2} >
                       
                       </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                           
                            margin="normal"            
                            value={currentUser.location}                        
                            required
                            fullWidth
                            id="location"
                            label="Location"
                            name="location"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>    
                <Grid xs={12} container item>
                    <Grid xs={2} >
                  
                    </Grid>
                    <Grid xs={8} >
                    <TextField
                            className={classes.textfield}
                            
                            margin="normal"            
                            value={currentUser.language}                        
                            required
                            fullWidth
                            id="language"
                            label="language"
                            name="language"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>  
                    <Grid container item xs={12}>
                            <Grid item xs={10}>

                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}>           
                                    Update
                                </Button>
                            </Grid>
                    </Grid>
                </Grid>

                </form>
                </Grid>
           </Paper>}
        </Container>
    )
}

ProfilePage.propTypes = {
    currentUser: PropTypes.object,
    classes: PropTypes.object,
    match:PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
}


  const mapStateToProps = createStructuredSelector({
      currentUser: authSelectors.makeSelectCurrentUser(),
  });

const mapDispatchToProps =  (dispatch) => {
  return {
    actions: {
      ...bindActionCreators(authActions, dispatch)
    },
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
  )(ProfilePage);