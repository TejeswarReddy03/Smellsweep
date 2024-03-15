import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useLocation } from 'react-router-dom';

function ExtremeValuesGraph({ metrics }) {
  const { state } = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (state && state.ok) {
      // Extract extreme values metrics from the backend response
      const extremeValuesMetrics = state.ok;
      
      // Convert the metrics object into an array of objects
      const dataArray = Object.entries(extremeValuesMetrics).map(([columnName, metric]) => ({
        attribute: columnName,
        count: metric.num_extreme_values || 0
      }));
      
      // Set the data state
      setData(dataArray);
    }
  }, [state]);

  return (
    <BarChart width={800} height={600} data={data} margin={{ top: 10, right: 30, left: 20, bottom: 170 }}>
      <XAxis dataKey="attribute" tickLine={false} label={{ value: 'Attribute Names', position: 'bottom' }} angle={-60} textAnchor="end" interval={0} />
      <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}

export default ExtremeValuesGraph;
