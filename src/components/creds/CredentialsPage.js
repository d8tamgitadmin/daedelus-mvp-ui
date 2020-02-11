import React, { useState, useEffect }  from 'react';

import { withRouter } from 'react-router-dom';
import { push, replace } from 'connected-react-router';


import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

import RefreshIcon from '@material-ui/icons/Refresh';

import * as authActions from "../../redux/actions/authActions";
import * as authSelectors from "../../redux/selectors/authSelector";

import * as accountActions from "../../redux/actions/accountActions";
import * as accountSelectors from "../../redux/selectors/accountSelector";

import * as kycSelectors from "../../redux/selectors/kycSelectors";
import * as kycActions from "../../redux/actions/kycActions";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container, Typography, Button, Paper, Grid, Tabs, Tab, TabPanel,IconButton } from '@material-ui/core';


import SchemaCreateModule from "./SchemaCreateModule";
import SchemaTable from "./SchemaTable";
import SchemaDefinitionTable from "./SchemaDefinitionTable";
import SchemaDefinitionCreateModule from "./SchemaDefinitionCreateModule";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color:"white"
    },
    container:{
       fontSize:"12px"  , 
    
    },
    paperHeader: {
        width:"80vw",
        background:'white',
        margin:theme.spacing(3, 0, 2),
        padding: theme.spacing(2)
    },
    paper:{
        margin:theme.spacing(3, 0, 2),
        background:'white',
        height:"30vh"    ,
        width:"80vw",
        overflow:"scroll"
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

const CredentialsPage = (props) => {

    const {currentAccount, schemas, isFetchingSchemas, schemaDefinitions, isFetchingSchemaDefinitions} = props;
    const classes = useStyles();

    const [tabValue, setTabValue] = React.useState(0);

    const [state, setState] = useState({
        authenticated:null,
        
    });

    const checkAuthentication = async () =>{
        const auth = await props.auth.isAuthenticated();
        if (auth !== state.authenticated) {
          setState({ authenticated:auth});
        }
    }

    useEffect(() => {
        checkAuthentication();
        if(currentAccount){
            props.actions.getKycSchemas(currentAccount.id);
            props.actions.getKycSchemaDefinitions(currentAccount.id);
        }
    },[]);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    const handleCreateSchemaSubmit = schema => {
        props.actions.createKycSchema(schema, currentAccount)
    };
    const handleCreateSchemaDefinitionSubmit = schemaDefinition => {
        props.actions.createKycSchemaDefinition(schemaDefinition, currentAccount);
    }

    const handleRefresh = e => {
        e.preventDefault();
        props.actions.getKycSchemas();
    }

    const handleRefreshDefinitions = e => {
        e.preventDefault();
        props.actions.getKycSchemaDefinitions(currentAccount.id);
    }

    return(

        <React.Fragment>
         <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Schema" />
        <Tab label="Definition" />

      </Tabs>
      {tabValue == 0 && 
      <Container className={classes.container}>
            <Grid container item xs={12}>
                <Paper className={classes.paperHeader}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h5">
                                Schemas
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={3}>
                           <SchemaCreateModule onSubmit={handleCreateSchemaSubmit}/>
                        </Grid>
                        <Grid item xs={2}>
                        <IconButton onClick={handleRefresh} variant="out" color="secondary">
                            <RefreshIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
            <Grid container item xs={12}>
                <Paper className={classes.paper}>
                <Grid container item xs={12}>
                
                {isFetchingSchemas ? <CircularProgress/> :
                            <SchemaTable schemas={schemas}/>
                        }
                </Grid>
                
                  
                </Paper>
            </Grid>
        </Container>
      }
      {tabValue ==1 &&
        <Container className={classes.container}>
            <Grid container item xs={12}>
                <Paper className={classes.paperHeader}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h5">
                                Definitions
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={3}>
                            <SchemaDefinitionCreateModule schemas={schemas} onSubmit={handleCreateSchemaDefinitionSubmit}/>
                        </Grid>
                        <Grid item xs={2}>
                        <IconButton onClick={handleRefreshDefinitions} variant="out" color="secondary">
                            <RefreshIcon />
                        </IconButton>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
            <Grid container item xs={12}>
                <Paper className={classes.paper}>
                <Grid container item xs={12}>
                
                {isFetchingSchemaDefinitions && schemaDefinitions != null ? <CircularProgress/> :
                            <SchemaDefinitionTable schemaDefinitions={schemaDefinitions}/>
                        }
                </Grid>
                
                  
                </Paper>
            </Grid>
        </Container>
      
      }

      
    </React.Fragment>
       
    
   );
}

CredentialsPage.propTypes = {
    currentUser: PropTypes.object,
    currentAccount: PropTypes.object,
    schemas: PropTypes.object,
    schema: PropTypes.object,
    isCreatingSchema: PropTypes.bool,
    isFetchingSchemas: PropTypes.bool,
    schemaErrorMessage: PropTypes.string,
    schemasErrorMessage: PropTypes.string,

    schemaDefinition:PropTypes.object,
    isCreatingSchemaDefinition:PropTypes.bool,
    schemaDefinitionErrorMessage:PropTypes.string,

    schemaDefinitions:PropTypes.object,
    isFetchingSchemaDefinitions:PropTypes.bool,
    schemaDefinitionsErrorMessage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    currentUser: authSelectors.makeSelectCurrentUser(),
    currentAccount: accountSelectors.makeSelectAccount(),
    schemas: kycSelectors.makeSelectKycSchemas(),
    schema: kycSelectors.makeSelectKycSchema(),
    isCreatingSchema: kycSelectors.makeSelectIsCreatingKycSchema(),
    isFetchingSchemas: kycSelectors.makeSelectIsFetchingKycSchemas(),
    schemasErrorMessage: kycSelectors.makeSelectGetKycSchemasErrorMessage(),
    schemaErrorMessage: kycSelectors.makeSelectCreateKycSchemaErrorMessage(),
    schemaDefinition:kycSelectors.makeSelectSchemaDefinition(),
    isCreatingSchemaDefinition:kycSelectors.makeSelectIsCreatingSchemaDefinition(),
    schemaDefinitionErrorMessage: kycSelectors.makeSelectSchemaDefinitionErrorMessage(),
    schemaDefinitions: kycSelectors.makeSelectSchemaDefinitions(),
    isFetchingSchemaDefinitions: kycSelectors.makeSelectIsFetchingSchemaDefinitions(),
    schemaDefinitionsErrorMessage: kycSelectors.makeSelectSchemaDefinitionsErrorMessage()
});

const mapDispatchToProps =  (dispatch) => {
return {
  actions: {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(accountActions, dispatch),
    ...bindActionCreators(kycActions, dispatch)
  },nav: {
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
)(CredentialsPage);