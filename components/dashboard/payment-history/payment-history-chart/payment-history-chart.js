import React, { useState } from 'react';

import dayjs from 'dayjs';

// Styles
import * as Styles from './payment-history-chart.styles';
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

const PaymentsLineChart = ({ payments }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const filterLogsByDateRange = (payments) => {
    const currentDate = dayjs();
    const filteredLogs = payments.filter((payment) => {
      const paymentDate = dayjs(payment.createdAt);
      return paymentDate.isAfter(currentDate.subtract(selectedPeriod, 'month'));
    });
    return filteredLogs;
  };

  const filteredPayments = filterLogsByDateRange(payments);

  const calculateTotalAmount = (payments, date) => {
    const targetDate = dayjs(date);
    return payments.reduce((total, payment) => {
      const paymentDate = dayjs(payment.createdAt);
      if (paymentDate.isSame(targetDate, 'day')) {
        return total + payment.planId.charges;
      }
      return total;
    }, 0);
  };

  const occurrencesCount = (filteredPayments) => {
    const dayOccurrences = {};

    filteredPayments.forEach((payment) => {
      const day = dayjs(payment.createdAt).locale('en').format('DD MMMM');
      const type = 'listing';

      if (!dayOccurrences[day]) {
        dayOccurrences[day] = {
          listing: 0,
          totalPayment: 0,
        };
      }

      dayOccurrences[day][type]++;
      dayOccurrences[day].totalPayment = calculateTotalAmount(
        filteredPayments,
        payment.createdAt
      );
    });

    return dayOccurrences;
  };

  const occurrences = occurrencesCount(filteredPayments);

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
        display: true,
      },
      y: {
        ticks: {
          stepSize: 2,
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
        label: 'Total Payments(US$)',
        data: Object.values(occurrences).map((log) => log.totalPayment),
        backgroundColor: 'green',
        borderColor: 'green',
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

export default PaymentsLineChart;
