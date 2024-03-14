import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FloatAsStringChart = ({ obj }) => {
  // Transform object into array of objects with column and percentage properties
  const chartData = Object.entries(obj.float_as_string).map(([column, percentage]) => ({
    column,
    percentage
  }));

  return (
    <div>
      {obj && obj.status ? (
        <div>
          <h2>Columns Containing Floats Stored as Strings</h2>
          <div style={{ maxWidth:'620px',backgroundColor: 'white', padding: '20px', transition: 'all 1s ease' }}>

          <BarChart width={600} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="column" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" fill="#8884d8" />
          </BarChart>
          </div>
          <p style={{ color: 'black', fontWeight: 'bold',height:'14px',marginBottom:'20px',marginTop:'20px' }}>Tabular format</p>
          <div style={{ backgroundColor: 'white', padding: '20px', transition: 'all 1s ease' }}>
           
          <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
            <thead>
              <tr style={{ border: '1px solid black', backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid black', padding: '8px' }}>Column</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map(({ column, percentage }) => (
                <tr key={column} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{column}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <p  style={{ color: 'black', fontWeight: 'bold', fontSize: '30px' }}>No float_as_string data smells detected.</p>


      )}
    </div>
  );
};

export default FloatAsStringChart;
