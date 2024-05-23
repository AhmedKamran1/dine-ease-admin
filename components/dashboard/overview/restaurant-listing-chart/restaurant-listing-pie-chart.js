import React from 'react';

// Styles
import { Box } from '@mui/material';
import { DashboardContent } from '@/components/UI';

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { Pie } from 'react-chartjs-2';
import { Status } from '@/utils/constants';

const RestaurantListingPieChart = ({ restaurants }) => {
  const countByType = restaurants.reduce((acc, restaurant) => {
    acc[restaurant.status] = (acc[restaurant.status] || 0) + 1;
    return acc;
  }, {});

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
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
    labels: ['Approved Restaurants', 'Pending Restaurants'],
    datasets: [
      {
        label: 'Number of Records',
        data: [countByType[Status.APPROVED.value], countByType[Status.PENDING.value]],
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

export default RestaurantListingPieChart;
