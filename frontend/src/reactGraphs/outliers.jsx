import React from 'react';
import { Bar } from 'react-chartjs-2';

const OutliersBarChart = ({ outlierData }) => {
  const columns = Object.keys(outlierData);
  
  // Prepare data for the bar chart
  const data = {
    labels: columns,
    datasets: [
      {
        label: 'Number of Outliers',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: columns.map(col => outlierData[col].num_outliers),
      },
      // Add more datasets for other metrics if needed
    ],
  };

  const options = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OutliersBarChart;
