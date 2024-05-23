import React, { useEffect, useState } from 'react';

//Styles
import { Grid } from '@mui/material';
import { DashboardContainer } from '@/components/UI';

// Services
import { getAllRestaurants } from '@/services';

// Helpers
import { getError } from '@/helpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

//Components
import Cards from './card/card';
import AverageRestaurantRatings from './average-restaurant-ratings/average-restaurant-ratings';
import RestaurantListingsLineChart from './restaurant-listing-chart/restaurant-listing-line-chart';
import RestaurantListingPieChart from './restaurant-listing-chart/restaurant-listing-pie-chart';
import RestaurantsTable from './restaurants-table/restaurants-table';

const Overview = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchAllRestaurants = async () => {
    try {
      const response = await getAllRestaurants();
      setRestaurants(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  return (
    <DashboardContainer container columnSpacing={1} rowGap={1}>
      <Grid item xs={12} lg={7}>
        <Cards restaurants={restaurants} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <AverageRestaurantRatings restaurants={restaurants} />
      </Grid>
      <Grid item xs={12} lg={8}>
        <RestaurantListingsLineChart restaurants={restaurants} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <RestaurantListingPieChart restaurants={restaurants} />
      </Grid>
      <Grid item xs={12}>
        <RestaurantsTable restaurants={restaurants} />
      </Grid>
    </DashboardContainer>
  );
};

export default Overview;
