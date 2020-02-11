import React, {setState, useEffect} from "react";

import Title from "../common/Title";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody, Button } from '@material-ui/core';




const useStyles = makeStyles(theme => {

})

const InvitesTable = (props) => {

    const classes = useStyles();
    const {sourceInvites, targetInvites, handleReject,handleAccept} = props;
    

    return (
    
            <Table  size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Origin</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>DID</TableCell>
                        <TableCell>Created</TableCell>                       
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sourceInvites.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>Sent</TableCell>
                            <TableCell>{row.status}</TableCell>         
                            <TableCell>{row.ResponseDID}</TableCell>                            
                            <TableCell>{row.created != null ? row.created.split('T')[0] : ""}</TableCell>
                            <TableCell><Button onClick={handleReject(row.id)} variant="outlined">Recall</Button></TableCell>
                        </TableRow>
                    ))}
                    {targetInvites.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>Requested</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.RequestingDID}</TableCell>
                            <TableCell>{row.created != null ? row.created.split('T')[0] : ""}</TableCell>
                            <TableCell><Button color="primary" onClick={handleAccept(row)} variant="contained">Accept</Button>
                            <Button onClick={handleReject(row.id)} variant="outlined">Reject</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
      
    )

}

export default InvitesTable;