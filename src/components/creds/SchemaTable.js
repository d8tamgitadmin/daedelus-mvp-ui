import React, {useEffect, useState} from "react";

import { withStyles,makeStyles } from '@material-ui/core/styles';
import {Table, TableHead, TableCell, TableRow,TableBody, Button } from '@material-ui/core';




const useStyles = makeStyles(theme => {

});

const SchemaTable = props => {
    const classes = useStyles();
    const {schemas} = props;

    return (
            <Table  size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Version</TableCell>
                        <TableCell>Attributes</TableCell>
                        <TableCell>Schema Id</TableCell>
                        <TableCell>Schema Json</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Modified</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schemas.map(schema => (
                        <TableRow key={schema.id}>
                            <TableCell>{schema.name}</TableCell>
                            <TableCell>{schema.version}</TableCell>
                            <TableCell>{schema.attributes}</TableCell>
                            <TableCell>{schema.schemaId}</TableCell>
                            <TableCell>{schema.json}</TableCell>
                            <TableCell>{schema.created != null ? schema.created.split('T')[0] : ""}</TableCell>
                            <TableCell>{schema.modified != null ? schema.modified.split('T')[0] : ""}</TableCell>
                            <TableCell><Button variant="outlined">TBD</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    )

  }

  export default SchemaTable;