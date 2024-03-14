import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function MyHistogram6() {
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
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Names', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default MyHistogram6;
