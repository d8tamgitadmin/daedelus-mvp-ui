import React, { useState, useEffect }  from 'react';

import Title from "../common/Title";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody } from '@material-ui/core';


const useStyles = makeStyles(theme => {

})

const AccountWallets = (props) => {

    const classes = useStyles();
    const {wallets} = props;
    
    return (
        <React.Fragment>
            <Title>Wallets</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Agent</TableCell> 
                        <TableCell>WalletId</TableCell>
                        <TableCell>WalletKey</TableCell>
                        <TableCell>Created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {wallets.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.agent}</TableCell>
                            <TableCell>{row.walletId}</TableCell>
                            <TableCell>{row.walletKey}</TableCell>
                            <TableCell>{row.modified.split('T')[0]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

export default AccountWallets;

