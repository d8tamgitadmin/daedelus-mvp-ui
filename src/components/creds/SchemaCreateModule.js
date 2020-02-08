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


  const schemaDefault = {
      name:"",
      version:"",
      attributes:"",
      created: generateDate(),
      modified: generateDate()
  };



const SchemaCreateModule = props => {
    const classes = useStyles();
    const {onSubmit} = props;
    const [open, setOpen] = useState(false);
    const [schema, setSchema] = useState(schemaDefault);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(schema);
        setOpen(false);
    };

    const handleChange = input => e => {
        e.preventDefault();
        setSchema({...schema,[input]:e.target.value});
    }

    return (
        <React.Fragment>
            <Button variant="contained" color="primary"
            onClick={() =>setOpen(true)}>
                Create Schema
            </Button>
            <Dialog className={classes.dialog} open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-create-schema-title">
                <form noValidate>
                    <DialogTitle 
                    id="form-dialog-title">Create New Schema</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4}>
                            <Grid xs={12} item>
                                <TextField 
                                    required
                                    fullWidth
                                    hintText="Enter Schema Name"
                                    label="Schema Name"
                                    onChange={handleChange("name")}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    required
                                    fullWidth
                                    hintText="Enter Schema Version"
                                    label="Schema Version"
                                    onChange={handleChange("version")}
                                    />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows="8"
                                    hintText="Enter JSON Array of Attributes"
                                    label="Attributes"
                                    onChange={handleChange("attributes")}
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

export default SchemaCreateModule;