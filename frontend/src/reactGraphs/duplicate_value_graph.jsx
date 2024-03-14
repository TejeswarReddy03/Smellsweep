import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function DuplicateDataGraph() {
  const { state } = useLocation();

  // Extract attributes and counts from the state object or default to empty arrays
  const attributes = state.ok ? state.ok.attributes : [];
  const counts = state.ok ? state.ok.counts : [];

  // Combine attributes with their corresponding counts into an array of objects
  const data = attributes.map((attribute, index) => ({
    name: attribute,
    count: counts[index] || 0 // default to 0 if count is not available
  }));

  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Attributes', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default DuplicateDataGraph;
