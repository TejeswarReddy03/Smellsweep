import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function CasingInconsistenciesGraph() {
  const { state } = useLocation();

  // Extract the attribute and count data from state.ok
  const attributes = state.ok?.attribute || [];
  const counts = state.ok?.count || [];

  // Combine attributes and counts into an array of objects
  const data = attributes.map((attribute, index) => ({ name: attribute, count: counts[index] || 0 }));

  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 150 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Attribute', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#88004d8" />
    </BarChart>
  );
}

export default CasingInconsistenciesGraph;
