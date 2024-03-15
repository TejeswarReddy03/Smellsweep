import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function SuspectClassValuesGraph() {
  const { state } = useLocation();
  const dummy1 = state.ok || {}; // Default to an empty object if state.ok is undefined

  // Extract attributes and suspect_count data, providing default empty arrays if not found
  const attributes = dummy1.attributes || [];
  const counts = dummy1.suspect_count || [];

  // Combine attributes and counts into an array of objects, handling edge cases
  const data = attributes.map((name, index) => ({ name, count: counts[index] || 0 }));

  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Names', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default SuspectClassValuesGraph;
