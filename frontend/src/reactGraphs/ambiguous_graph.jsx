import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function AmbiguousValuesComponent() {
  const { state } = useLocation();

  // Extract the ambiguous values from state.ok or default to an empty array
  const ambiguousValues = state.ok || [];

  // Create data array with attribute names and their counts
  const data = ambiguousValues.map((value, index) => ({ name: value[1], count: value[0] }));

  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Attribute Names', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis dataKey="count" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default AmbiguousValuesComponent;
