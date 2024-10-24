import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';

const DynamicDataTableCreateBill = ({
    headers = [],
    data = [],
}) => {
    const [rows, setRows] = useState(data);

    useEffect(() => {
        setRows(data);
    }, [data]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            headers.map((headingName, index) => (
                                <TableCell key={index}>
                                    {headingName}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography>
                                    {index + 1}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {row.Name}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {row.Amount}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {row.UnitPrice}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {row.Amount * row.UnitPrice}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DynamicDataTableCreateBill;