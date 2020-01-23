import React,  {useState, useEffect} from "react";
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const SearchBar = props => {

    const {nameFilter, setNameFilter} = props;
    const classes = useStyles();
    return (
        <React.Fragment>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Search Public Free Zone Public Members</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
               <SearchIcon />
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>
        </React.Fragment>
    )

}

export default SearchBar;
