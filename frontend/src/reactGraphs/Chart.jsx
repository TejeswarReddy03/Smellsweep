import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function MyHistogram() {
  const { state } = useLocation();
  const dummy1 = state.ok;
  const dummy2 = state.ok2;
  console.log(dummy1, dummy2);

  // Assuming dummy1 and dummy2 are arrays of names and counts
  const data = dummy1.map((name, index) => ({
    name,
    count: dummy2[index],
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Names', position: 'bottom' }} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default MyHistogram;
