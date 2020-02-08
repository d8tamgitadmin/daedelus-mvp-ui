import React, {useEffect, useState} from "react";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
  
    },
    dialog: {
      
    },
    margin :{
  
    }
  }));

  const generateDate = () => {
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth()+1).toString(); 
    let yyyy = today.getFullYear().toString();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    return yyyy+"-"+mm+"-"+dd;
}


  const schemaDefinitionDefault = {
        id:0,
        kycSchemaId:"",
        schemaJson:"",
        accountId:"",
        credDefTag:"",
        credDefConfigJson:"",
        credDefId:"",
        credDefJson:"",
      created: generateDate(),
      modified: generateDate()
  };



const SchemaDefinitionCreateModule = props => {
    const classes = useStyles();
    const {onSubmit, schemas} = props;
    const [open, setOpen] = useState(false);
    const [schemaDefinition, setSchemaDefintion] = useState(schemaDefinitionDefault);

    const handleSubmit = e => {
        e.preventDefault();
        // current account gets set in saga
        onSubmit(schemaDefinition);
        setOpen(false);
    };

    const handleChange = input => e => {
        e.preventDefault();
        setSchemaDefintion({...schemaDefinition,[input]:e.target.value});
    }

    const handleSchemaChange = input => e => {
        e.preventDefault();
        setSchemaDefintion({...schemaDefinition,
            ["kycSchemaId"]:e.target.value.id,
            ["schemaJson"]: e.target.value.json
        });
        
    }

    return (
        <React.Fragment>
            <Button variant="contained" color="primary"
            onClick={() =>setOpen(true)}>
                Create Schema Definition
            </Button>
            <Dialog className={classes.dialog} open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-create-schema-title">
                <form noValidate>
                    <DialogTitle 
                    id="form-dialog-title">Create New Schema Definition</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4}>
                            <Grid xs={12} item>
                            <TextField
                                    id="new-schema-definition"
                                    select
                                    fullWidth
                                    label="Schema"
                                    onChange={handleSchemaChange("schema")}
                                    helperText="Please select a Schema"
                                >
                                    {schemas.map(schema => (
                                    <MenuItem key={schema.name} value={schema}>
                                        {schema.name + " " + schema.version}
                                    </MenuItem>
                                    ))}
                            </TextField>
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    required
                                    fullWidth
                                    hintText="Enter Schema Definition Tag"
                                    label="Schema Definition Tag"
                                    onChange={handleChange("credDefTag")}
                                    />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                <Button onClick={(e) => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
                    Create
                </Button>
                </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )

};

export default SchemaDefinitionCreateModule;