import React, { useState } from 'react';
import dayjs from 'dayjs';

//Styles
import * as Styles from './restaurant-listing-line-chart.styles';
import { Box } from '@mui/material';
import { DashboardContent, Text } from '@/components/UI';

// Utils
import { Periods } from '@/utils/constants';

// Chart
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RestaurantListingsLineChart = ({ restaurants }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const filterRestaurantsByDateRange = (restaurants) => {
    const currentDate = dayjs();
    const filteredReviews = restaurants.filter((restaurant) => {
      const reviewDate = dayjs(restaurant.createdAt);
      return reviewDate.isAfter(currentDate.subtract(selectedPeriod, 'month'));
    });
    return filteredReviews;
  };

  const filteredRestaurants = filterRestaurantsByDateRange(restaurants);

  const occurrencesCount = (filteredRestaurants) => {
    const dayOccurrences = {};

    filteredRestaurants.forEach((restaurant) => {
      const day = dayjs(restaurant.createdAt).locale('en').format('DD MMMM YYYY');
      const type = restaurant.status;

      if (!dayOccurrences[day]) {
        dayOccurrences[day] = {
          approved: 0,
        };
      }

      dayOccurrences[day][type]++;
    });

    return dayOccurrences;
  };

  const occurrences = occurrencesCount(filteredRestaurants);

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
        label: 'Approved Restaurants',
        data: Object.values(occurrences).map((restaurant) => restaurant.approved),
        backgroundColor: 'orange',
        borderColor: 'orange',
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

export default RestaurantListingsLineChart;
