// src/components/ProgressChart.js
import React from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ProgressChart = ({ easy, medium, hard }) => {
  const data = {
    labels: ['Easy', 'Medium', 'Hard'], // Labels for the chart
    datasets: [
      {
        data: [easy, medium, hard], // Data passed as props
        backgroundColor: ['#4CAF50', '#FF9800', '#F44336'], // Colors for each section
        borderWidth: 1, // Border width for each section
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Display percentage in tooltip
          },
        },
      },
    },
  };

//   return <Pie data={data} options={options} />;
  return <Doughnut data={data} options={options} />;
};

export default ProgressChart;
