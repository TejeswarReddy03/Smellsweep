import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function MisspelledDataGraph() {
  const { state } = useLocation();
  const misspelledData = state.ok || {};

  // Convert the object into an array of objects with attribute and count properties
  const data = Object.entries(misspelledData[1]).map(([attribute, misspelledValues]) => ({
    name: attribute,
    count: misspelledValues.length // count of misspelled values
  }));

  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Attributes', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis dataKey="count" />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default MisspelledDataGraph;
