import React, {setState, useEffect} from "react";

import Title from "../common/Title";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody, Button } from '@material-ui/core';




const useStyles = makeStyles(theme => {

})

const InvitesTable = (props) => {

    const classes = useStyles();
    const {sourceInvites, targetInvites} = props;
    
    /*
    public long id;

    public Long sourceAccountId;

    public String RequestingDID;

    public String RequestingVerkey;

    public String nonce;

    public Long targetAccountId;

    public String ResponseDID;

    public String ResponseVerkey;

    public InvitationStatus status;

    public Date created;

    public Date modified;

    */
    return (
    
            <Table  size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Origin</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Source</TableCell>
                        <TableCell>Source DID</TableCell>
                        <TableCell>Source Verkey</TableCell>
                        <TableCell>Nonce</TableCell>
                        <TableCell>Target</TableCell>
                        <TableCell>Target DID</TableCell>
                        <TableCell>Target Verkey</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Modified</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sourceInvites.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>Sent</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.sourceAccountId}</TableCell>
                            <TableCell>{row.RequestingDID}</TableCell>
                            <TableCell>{row.RequestingVerkey}</TableCell>
                            <TableCell>{row.nonce}</TableCell>
                            <TableCell>{row.targetAccountId}</TableCell>
                            <TableCell>{row.ResponseDID}</TableCell>
                            <TableCell>{row.ResponseVerkey}</TableCell>
                            <TableCell>{row.created != null ? row.created.split('T')[0] : ""}</TableCell>
                            <TableCell>{row.modified != null ? row.modified.split('T')[0] : ""}</TableCell>
                            <TableCell><Button variant="outlined">Recall</Button></TableCell>
                        </TableRow>
                    ))}
                    {targetInvites.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>Requested</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.sourceAccountId}</TableCell>
                            <TableCell>{row.RequestingDID}</TableCell>
                            <TableCell>{row.RequestingVerkey}</TableCell>
                            <TableCell>{row.nonce}</TableCell>
                            <TableCell>{row.targetAccountId}</TableCell>
                            <TableCell>{row.ResponseDID}</TableCell>
                            <TableCell>{row.ResponseVerkey}</TableCell>
                            <TableCell>{row.created != null ? row.created.split('T')[0] : ""}</TableCell>
                            <TableCell>{row.modified != null ? row.modified.split('T')[0] : ""}</TableCell>
                            <TableCell><Button variant="contained">Accept</Button><Button variant="outlined">Rejct</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
      
    )

}

export default InvitesTable;