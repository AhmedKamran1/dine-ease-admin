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
import { Pie } from 'react-chartjs-2';

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

const logsData = [
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-12-28T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-06T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-12-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-11-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-10-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-09-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'pending',
    createdAt: '2023-08-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-07-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-06-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-05-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-04-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-03-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-02-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-12-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-11-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-10-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-09-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-08-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'pending',
    createdAt: '2023-07-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-06-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-05-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-04-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-03-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-02-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
];

const LogsPieChart = () => {
  const countByType = logsData.reduce((acc, log) => {
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
      title: {
        display: false,
        text: 'Listing',
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
        data: Object.values(countByType),
        backgroundColor: ['orange', 'red'],
        // cubicInterpolationMode: 'monotone',
      },
    ],
  };

  return (
    <DashboardContent>
      <Box sx={{ height: '340px' }}>
        <Pie data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default LogsPieChart;
