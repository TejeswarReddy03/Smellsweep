import React from 'react';
import { Bar } from 'react-chartjs-2';

const MyBarChart = () => {
  const data = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        label: 'Data Set 1',
        data: [10, 20, 15, 25],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MyBarChart;
