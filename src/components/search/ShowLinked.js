import React, {useState, useEffect} from "react";

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {FormControlLabel, Checkbox } from "@material-ui/core";

const ShowLinked = (props) => {

    const {value, setValue} = props;

    return (
     <React.Fragment>
         <FormControlLabel
    control={
      <Checkbox
        icon={<VisibilityIcon fontSize="small" />}
        checkedIcon={<VisibilityOffIcon fontSize="small" />}
        onChange={() => setValue(!value)}
        value={value}
      />
    }
    label="Show Linked"
  />
  </React.Fragment>)
}

export default ShowLinked;