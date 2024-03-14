import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const IntegerAsStringChart = (props) => {
    const data = props.obj;

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    };

    return (
        <div>
            {data && data.status ? (
                <div>
                    <h2>Columns Containing Integers Represented as Strings</h2>
                    <BarChart width={800} height={400} data={Object.entries(data.integer_as_string)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="[0]" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="[1].percentage" fill="#8884d8" name="Percentage" />
                        <Bar dataKey="[1].rows_with_smell" fill="#82ca9d" name="Rows with Smell" />
                    </BarChart>
                    <h2>Details</h2>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Column</th>
                                <th style={thStyle}>Percentage</th>
                                <th style={thStyle}>Rows with Smell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data.integer_as_string).map(([column, { percentage, rows_with_smell }]) => (
                                <tr key={column}>
                                    <td style={tdStyle}>{column}</td>
                                    <td style={tdStyle}>{percentage}%</td>
                                    <td style={tdStyle}>{rows_with_smell}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No integer-as-string data smells detected.</p>
            )}
        </div>
    );
};

export default IntegerAsStringChart;
