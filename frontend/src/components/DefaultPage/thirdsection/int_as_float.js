import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const IntegerAsFloatChart = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Set loaded to true after a short delay to trigger the CSS transition
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 500);
        return () => clearTimeout(timer); // Clear the timeout on unmount
    }, []);

    const data = props.obj;

    return (
        <div>
            {data && data.status ? (
                <div>
                    <h2>Columns Containing Integers Represented as Floats</h2>
                    <div style={{ maxWidth:'620px',backgroundColor: 'white', padding: '20px', transition: 'all 1s ease' }}>
                        <BarChart width={600} height={400} data={Object.entries(data.integer_as_float)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="[0]" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="[1].percentage" fill="#E178C5" name="Percentage" />
                            <Bar dataKey="[1].rows_with_smell" fill="#82ca9d" name="Rows with Smell" />
                        </BarChart>
                    </div>
                    <p style={{ color: 'black', fontWeight: 'bold',height:'14px',marginBottom:'20px',marginTop:'20px' }}>Tabular format</p>

                    <div style={{ backgroundColor: 'white', padding: '20px', transition: 'all 1s ease' }}>
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
                </div>
            ) : (
                <p style={{ color: 'black', fontWeight: 'bold',fontSize:'30px' }}>No integer-as-float data smells detected.</p>
                
            )}
        </div>
    );
};

export default IntegerAsFloatChart;
