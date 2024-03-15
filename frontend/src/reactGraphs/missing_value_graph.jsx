import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function MissingDataGraph() {
  const { state } = useLocation();
  const dummy1 = state.ok || {}; // Default to an empty object if state.ok is undefined

  // Convert the object into an array of objects with name and count properties
  const data = Object.entries(dummy1).map(([name, count]) => ({ name, count }));
  
  // Extract names and counts, providing default empty arrays if not found
  const names = (data.find(item => item.name === 'columns_with_missing')?.count) || [];
  const counts = (data.find(item => item.name === 'missing_counts_per_column')?.count) || [];

  // Combine names and counts into an array of objects, handling edge cases
  const chartData = names.map((name, index) => ({ name, count: counts[index] || 0 }));

  return (
    <BarChart width={800} height={600} data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Names', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default MissingDataGraph;
