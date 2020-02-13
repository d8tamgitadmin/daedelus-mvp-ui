import React, { useState, useEffect }  from 'react';

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
        padding:theme.spacing(2)
    },
    margin :{
  
    }
  }));

const CreateLinkModule = props => {

    const {currentAccount, targetAccount, handleCreateLink} = props;

    const [open,setOpen] = useState(false);

    const classes = useStyles();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateLink(currentAccount, targetAccount);
        setOpen(false);
    }

    return (
        
        <React.Fragment>
       
            <Button onClick={()=> setOpen(true)} color="primary" variant="contained">Link</Button>
            {currentAccount && targetAccount && (
            <Dialog className={classes.dialog} open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="form-dialog-title">
                <form noValidate onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Invite Account</DialogTitle>
                
                <DialogContent>
                <Grid container spacing={4} >
                        <Grid xs={12} item>
                            <TextField
                                required
                                disabled
                                fullWidth
                                value={currentAccount.name}
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                required
                                disabled
                                fullWidth
                                value={targetAccount.name}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
                        Request
                    </Button>
                </DialogActions>

                </form>
            </Dialog>
        )}
        </React.Fragment>
    )
}

export default CreateLinkModule;