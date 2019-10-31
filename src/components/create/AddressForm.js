import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {MuiPickersUtilsProvider,  KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import FileUploadForm from "./FileUploadForm";

const useStyles = makeStyles(theme => ({
  submit: {
      margin: theme.spacing(3, 0, 2),
    },
 
}));


export default function AddressForm() {

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-10-31T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create New User
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email1"
            name="email1"
            label="Email"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            id="phone1"
            name="phone1"
            label="Phone"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        
        <Grid container justify="space-around" item xs={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
         required
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="dateofbirth1"
          name="dateofbirth1"
          label="Date Of Birth"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        </Grid>
      
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
         <FileUploadForm/>
        </Grid>
        <Grid item xs={12}>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Submit
          </Button>
           </Grid>
      </Grid>
    </React.Fragment>
  );
}