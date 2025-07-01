import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ chartData }) {
  // chartData should have this shape:
  // {
  //   labels: ["Point 1", "Point 2", ...],
  //   datasets: [
  //     { label: "Form 1", data: [...] },
  //     { label: "Form 2", data: [...] }
  //   ]
  // }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        color: 'orange',
      },
      title: {
        display: true,
        text: 'Form Data Chart',
      },
      color: 'purple'
    },
  };

  return <Line options={options} data={chartData} />;
}

export default ChartComponent;
