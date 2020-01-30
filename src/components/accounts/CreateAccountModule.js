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
    
  },
  margin :{

  }
}));

const visibilities = [
  {
    value:"Public",
    label:"Public"
  },{
    value:"Private",
    label:"Private"
  }
];

const accountTypes = [
  {
    value:"Personal",
    label:"Personal"
  },{
    value:"Organization",
    label:"Organization"
  },{
    value:"Machine",
    label:"Machine"
  }
];

const poolRoleTypes = [
 {
    value:"TRUSTEE",
    label:"Partner"
  },{
    value:"NETWORK_MONITOR",
    label:"monitor"
  }
];

const permissionTypes = [
  {
    value:"Owner",
    label:"Owner"
  }, {
    value:"Admin",
    label:"Admin"
  },{
    value:"Observer",
    label:"Observer"
  },
]

const modelDefault = {
  accountPermissions:[],
  wallets:[],
  addresses:[]
};

const CreateAccountModule = (props)=> {
    const classes = useStyles();

    const {account,currentUser, onSubmit} = props;
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState(modelDefault);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = input => event => {

        event.preventDefault();
        setModel({...model,[input]:event.target.value});
    }

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

    const handleSubmit = (e) => {
      e.preventDefault()
      model.accountPermissions =[           
        {
          "userId":currentUser.id,
          "permissionType":"Owner",
          "created":generateDate(),
          "modified": generateDate()
        }];

        model.wallets = [
          {
            "agent":"daedalus-api",
            "walletId":model.key,
            "walletKey":model.credentialKey,
            "created":generateDate(),
          "modified": generateDate()
          }
        ]

        model.addresses =[           
          {
            "address1":"123 Fake st",
            "address2": null,
            "city":"washington dc",
            "state":"district of columbia",
            "zip":"99999",
            "country":"united states",
            "created":generateDate(),
            "modified": generateDate()
          }];
          model.created = generateDate();
          model.modified = generateDate();
      setOpen(false);
      console.log(model);
      onSubmit(model);   
      setModel(modelDefault);     
    }

    return (
    <div>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            New
                        </Button>
       <Dialog className={classes.dialog} open={open} 
       onClose={handleClose} 
       aria-labelledby="form-dialog-title">
       <form noValidate>
        <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
        <DialogContent>
         <Grid container spacing={4} >
           <Grid xs={12} item>
           <TextField
            required
            fullWidth
            hintText="Enter Account Name"
            label="Account Name"
            onChange={handleChange("name")}
          />
           </Grid>
           <Grid xs={12} item>
           <TextField
            required
            fullWidth
            hintText="Enter Wallet Key"
            label="Wallet Name"
            onChange={handleChange("key")}
          />
           </Grid>
           <Grid xs={12} item>
           <TextField
            required
            fullWidth
            hintText="Enter Wallet Credential"
            label="Wallet Credential"
            onChange={handleChange("credentialKey")}
          />
           </Grid>
           <Grid xs={12} item>
                <TextField
                    id="account-visibility"
                    select
                    fullWidth
                    label="Visibility Type"
                    onChange={handleChange("visibilityType")}
                    helperText="Please select account visibility"
                  >
                    {visibilities.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
              </TextField>
           </Grid>
           <Grid xs={12} item>
            <TextField
                      id="account-type"
                      select
                      fullWidth
                      label="Account Type"
                      onChange={handleChange("accountType")}
                      helperText="Please select Account Type"
                    >
                      {accountTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                </TextField>
           </Grid>
           <Grid xs={12} item>
            <TextField
                      id="pool-roll-type"
                      select
                      fullWidth
                      label="Pool Roll Type"
                      onChange={handleChange("poolRollType")}
                      helperText="Please select Pool Roll Type"
                    >
                      {poolRoleTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                </TextField>
           </Grid>
           
         </Grid>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>)
}

export default CreateAccountModule;