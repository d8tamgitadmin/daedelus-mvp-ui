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

 const defaultOffer = {
      credDefId:"",
  };



const CredentialOfferModule = props => {
    const classes = useStyles();
    const {onSubmit, targetAccount, schemaDefinitions} = props;
    const [open, setOpen] = useState(false);
    const [offer, setOffer] = useState(defaultOffer);

    const handleSubmit = e => {
        e.preventDefault();   
        debugger;   
        onSubmit(offer, targetAccount);
        setOffer(defaultOffer);
        setOpen(false);
    };

    const handleChange = input => e => {
        e.preventDefault();
        setOffer({...offer,[input]:e.target.value});
    }


    return (
        <React.Fragment>
            <Button variant="contained" color="primary"
            onClick={() =>setOpen(true)}>
                Offer Credential
            </Button>
            <Dialog className={classes.dialog} open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-create-schema-title">
                <form noValidate>
                    <DialogTitle 
                    id="form-dialog-title">Create Credential Offer</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={4}>
                            <Grid xs={12} item>
                                <TextField 
                                    required
                                    fullWidth
                                    disabled
                                    label="Account Name"
                                    value={targetAccount.name}
                                />
                            </Grid>                            
                            <Grid xs={12} item>
                            <TextField
                                    id="new-schema-definition"
                                    select
                                    fullWidth
                                    label="Schema Definition"
                                    onChange={handleChange("credDefId")}
                                    helperText="Please select a Schema Definition"
                                >
                                    {schemaDefinitions.map(schemaDef => (
                                    <MenuItem key={schemaDef.credDefTag} value={schemaDef.credDefId}>
                                        {schemaDef.credDefTag}
                                    </MenuItem>
                                    ))}
                            </TextField>
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

export default CredentialOfferModule;