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

// Utils
import { Periods } from '@/utils/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LogsLineChart = ({ logs }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const filterLogsByDateRange = (logs) => {
    const currentDate = dayjs();
    const filteredLogs = logs.filter((log) => {
      const logDate = dayjs(log.createdAt);
      return logDate.isAfter(currentDate.subtract(selectedPeriod, 'month'));
    });
    return filteredLogs;
  };

  const filteredLogs = filterLogsByDateRange(logs);

  const occurrencesCount = (logs) => {
    const dayOccurrences = {};

    logs.forEach((log) => {
      const day = dayjs(log.createdAt).locale('en').format('DD MMMM');
      const type = log.type;

      if (!dayOccurrences[day]) {
        dayOccurrences[day] = {
          listing: 0,
          modify: 0,
        };
      }

      dayOccurrences[day][type]++;
    });

    return dayOccurrences;
  };

  const occurrences = occurrencesCount(filteredLogs);

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
    labels: Object.keys(occurrences),
    datasets: [
      {
        label: 'Listing Requests',
        data: Object.values(occurrences).map((log) => log.listing),
        backgroundColor: 'orange',
        borderColor: 'orange',
        cubicInterpolationMode: 'monotone',
      },
      {
        label: 'Modification Requests',
        data: Object.values(occurrences).map((log) => log.modify),
        backgroundColor: 'blue',
        borderColor: 'blue',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };
  return (
    <DashboardContent>
      <Styles.OptionContainer>
        {Periods.map((period) => (
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
      <Box sx={{ height: '280px' }}>
        <Line data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default LogsLineChart;
