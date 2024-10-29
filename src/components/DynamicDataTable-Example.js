import React, { useState } from 'react';

const DynamicDataTable = () => {
    const [rows, setRows] = useState([{ name: '', age: '' }]);

    const handleAddRow = () => {
        setRows([...rows, { name: '', age: '' }]);
    };

    const handleChange = (index, event) => {
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return { ...row, [event.target.name]: event.target.value };
            }
            return row;
        });
        setRows(newRows);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={row.name}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="age"
                                    value={row.age}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddRow}>Add Row</button>
        </div>
    );
};

export default DynamicDataTable;
