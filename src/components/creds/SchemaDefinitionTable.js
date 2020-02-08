import React, {useEffect, useState} from "react";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody, Button } from '@material-ui/core';




const useStyles = makeStyles(theme => {

});

const SchemaDefinitionTable = props => {
    const classes = useStyles();
    const {schemaDefinitions} = props;

    return (
            <Table  size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Tag</TableCell>
                        <TableCell>Config</TableCell>
                        <TableCell>Definition Id</TableCell>
                        <TableCell>Definition Json</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Modified</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schemaDefinitions && schemaDefinitions.map(schemaDefinition => (
                        <TableRow key={schemaDefinition.id}>
                            <TableCell>{schemaDefinition.credDefTag}</TableCell>
                            <TableCell>{schemaDefinition.credDefConfigJson}</TableCell>
                            <TableCell>{schemaDefinition.credDefId}</TableCell>
                            <TableCell>{schemaDefinition.credDefJson}</TableCell>
                            <TableCell>{schemaDefinition.created != null ? schemaDefinition.created.split('T')[0] : ""}</TableCell>
                            <TableCell>{schemaDefinition.modified != null ? schemaDefinition.modified.split('T')[0] : ""}</TableCell>
                            <TableCell><Button variant="outlined">TBD</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )

  }

  export default SchemaDefinitionTable;