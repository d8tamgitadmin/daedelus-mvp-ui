import React, {setState, useEffect} from "react";

import Title from "../common/Title";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody, Button } from '@material-ui/core';




const useStyles = makeStyles(theme => {

})

const CredsTable = (props) => {

    const classes = useStyles();
    const {offers} = props;   

    return (
    
            <Table  size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Origin</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Cred Id</TableCell>
                        <TableCell>Created</TableCell>                       
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {offers.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>Pending</TableCell>
                            <TableCell>{row.status}</TableCell>         
                            <TableCell>{row.credDefId}</TableCell>                            
                            <TableCell>{row.created != null ? row.created.split('T')[0] : ""}</TableCell>
                            <TableCell><Button variant="outlined">Accept</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )
}

export default CredsTable;