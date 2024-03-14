import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function MyHistogram2() {
  const { state } = useLocation();
//   console.log(state.ok);
  const dummy1 = state.ok;
  console.log(dummy1);
  const data = Object.entries(dummy1).map(([name, count]) => ({ name, count }));


  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="name" tickLine={false} label={{ value: 'Names', position: 'bottom' }} angle={-45} textAnchor="end" interval={0} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default MyHistogram2;
