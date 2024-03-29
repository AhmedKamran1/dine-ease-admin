import React from 'react';

// Styles
import { Box } from '@mui/material';
import { DashboardContent } from '@/components/UI';

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LogsPieChart = ({ logs }) => {
  const countByType = logs.reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {});

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
        display: false,
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        display: false,
      },
    },
  };

  const data = {
    labels: ['Listing Requests', 'Modification Requests'],
    datasets: [
      {
        label: 'Number of Records',
        data: [countByType['listing'], countByType['modify']],
        backgroundColor: ['orange', 'blue'],
      },
    ],
  };

  return (
    <DashboardContent>
      <Box sx={{ height: '320px' }}>
        <Pie data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default LogsPieChart;
