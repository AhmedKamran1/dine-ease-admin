import React, { useState } from 'react';

import dayjs from 'dayjs';

// Styles
import * as Styles from './logs-line-chart.styles';
import { DashboardContent, Text } from '@/components/UI';
import { Box } from '@mui/material';

// Chart
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const periods = [
  { id: '30 Days', value: 1 },
  { id: '3 Months', value: 3 },
  { id: '6 Months', value: 6 },
  { id: '1 Year', value: 12 },
];

const LogsLineChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const filterLogsByDateRange = (logs) => {
    const currentDate = dayjs();
    const filteredLogs = logs.filter((log) => {
      const logDate = dayjs(log.createdAt);
      return logDate.isAfter(currentDate.subtract(selectedPeriod, 'month'));
    });
    return filteredLogs;
  };

  const logs = filterLogsByDateRange(logsData);

  const occurrencesCount = (logs) => {
    const dayOccurrences = {};

    logs.forEach((log) => {
      const day = dayjs(log.createdAt).locale('en').format('DD MMMM');
      const type = log.type;

      if (!dayOccurrences[day]) {
        dayOccurrences[day] = {
          listing: 0,
          modification: 0,
        };
      }

      dayOccurrences[day][type]++;
    });

    return dayOccurrences;
  };

  const occurrences = occurrencesCount(logs);
  console.log(Object.keys(occurrences));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
        text: 'Last Month Review Trend',
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 5,
        },
        display: true,
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        display: true,
      },
    },
  };

  const data = {
    labels: Object.keys(occurrences).reverse(),
    datasets: [
      {
        label: 'Listing Requests',
        data: Object.values(occurrences)
          .reverse()
          .map((log) => log.listing),
        backgroundColor: 'orange',
        borderColor: 'orange',
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Modification Requests',
        data: Object.values(occurrences)
          .reverse()
          .map((log) => log.modification),
        backgroundColor: 'blue',
        borderColor: 'blue',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };
  return (
    <DashboardContent>
      <Styles.OptionContainer>
        {periods.map((period) => (
          <Styles.Option
            key={period.id}
            selected={period.value === selectedPeriod}
            onClick={() => setSelectedPeriod(period.value)}
          >
            <Text variant="sub" fontWeight={600}>
              {period.id}
            </Text>
          </Styles.Option>
        ))}
      </Styles.OptionContainer>
      <Box sx={{ height: '300px' }}>
        <Line data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default LogsLineChart;
