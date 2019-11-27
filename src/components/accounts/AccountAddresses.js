import React, { useState, useEffect }  from 'react';

import Title from "../common/Title";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody } from '@material-ui/core';


const useStyles = makeStyles(theme => {

})

const AccountAddresses = (props) => {

    const classes = useStyles();
    const {addresses} = props;
    
    return (
        <React.Fragment>
            <Title>Addresses</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Address1</TableCell>
                        <TableCell>Address2</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>State</TableCell>
                        <TableCell>Zip</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Created</TableCell>                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {addresses.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.address1}</TableCell>
                            <TableCell>{row.address2}</TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>{row.state}</TableCell>
                            <TableCell>{row.zip}</TableCell>
                            <TableCell>{row.country}</TableCell>
                            <TableCell>{row.modified.split('T')[0]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default AccountAddresses;

