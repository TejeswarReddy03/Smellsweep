import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const IntegerAsFloatChart = (props) => {
    const data = props.obj;

    return (
        <div>
            {data && data.status ? (
                <div>
                    <h2>Columns Containing Integers Represented as Floats</h2>
                    <BarChart width={800} height={400} data={Object.entries(data.integer_as_float)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="[0]" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="[1].percentage" fill="#8884d8" name="Percentage" />
                        <Bar dataKey="[1].rows_with_smell" fill="#82ca9d" name="Rows with Smell" />
                    </BarChart>
                    <h2>Number of Rows with Integers Represented as Floats</h2>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Column</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Percentage</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}>Rows with Smell</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data.integer_as_float).map(([column, { percentage, rows_with_smell }]) => (
                                <tr key={column}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{column}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{percentage}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rows_with_smell}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No integer-as-float data smells detected.</p>
            )}
        </div>
    );
};

export default IntegerAsFloatChart;
