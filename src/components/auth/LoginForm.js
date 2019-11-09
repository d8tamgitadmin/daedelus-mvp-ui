import React, { useState, useEffect }  from 'react';
import { Redirect } from "react-router";
import { withRouter } from 'react-router-dom';

import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import * as authActions from "../../redux/actions/authActions";

import { createStructuredSelector } from 'reselect';
import * as authSelectors from "../../redux/selectors/authSelector";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { CircularProgress } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "lightgray",
      color: "white"
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
    padding: theme.spacing(4),
    color:"white",
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
  form: {
   
    marginTop: theme.spacing(1),
    padding: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    "background":"green",
    '&:hover': {
      backgroundColor: 'lightgreen !important',
    },
  },
  span:{
      color:"white"
  },
  textfield:{
    backgroundColor:"white",
    "border-color": "green",
    "border-radius": "5px",   
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      
      
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
  spinner:{
    "margin-top":"100px",
    "font-size":"150px",
    "color":"orange"
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        D8TAM DAEDALUS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const LoginForm = (props) => {

    const classes = useStyles();

    const [sessionToken, setSessionToken] = useState(null);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [working, setWorking] = useState(false);
    const oktaAuth = new OktaAuth({ url: "https://dev-887734.okta.com" });

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);       
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

   const handleSubmit = (e) => {
        e.preventDefault();
       setWorking(true);
        oktaAuth
        .signIn({
          username: username,
          password: password
        })
        .then(res => {
          setSessionToken(res.sessionToken);
        }
          
        )
        .catch(err => {
          setWorking(false)
            setError(err.message);
          console.log(err.statusCode + ' error', err);
        });
    }

    

      const errorMessage = error ? (
        <span className="error-message">{error}</span>
      ) : null;

      return (
        <div>
          {
              sessionToken ? 
              props.auth.redirect({sessionToken: sessionToken}) :
              <Container  component="main" maxWidth="sm">
              {working  ? 
          <CircularProgress color='inherit' className={classes.spinner} size={120}/>       
        :
        <>
      <CssBaseline  />
      <div className={classes.paper}>
        
     
        <Typography className={classes.span} component="h5" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
        {errorMessage}
          <TextField
            className={classes.textfield}
            variant="outlined"
            margin="normal"            
            value={username}
            onChange={handleUsernameChange}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
          />
          <TextField
          className={classes.textfield}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>           
            Submit
          </Button>
          <Box mt={8}>
        <Copyright className={classes.span} />
      </Box>
        </form>
      </div> 
      </>}
    </Container>
              
          }
         </div>
      );
}

LoginForm.propTypes = {
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
  withConnect,
    withAuth,
    withRouter
)(LoginForm);