import React, { useState, useEffect }  from 'react';

import Title from "../common/Title";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody } from '@material-ui/core';


const useStyles = makeStyles(theme => {

})

const AccountMembers = (props) => {

    const classes = useStyles();
    const {accountPermissions} = props;
    
    return (
        <React.Fragment>
            <Title>Members</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>UserId</TableCell>
                        <TableCell>Permission</TableCell>
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accountPermissions.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.userId}</TableCell>
                            <TableCell>{row.permissionType}</TableCell>
                            <TableCell>{row.modified.split('T')[0]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default AccountMembers;

