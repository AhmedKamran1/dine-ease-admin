import React from 'react';
import useSWR from 'swr';
import { enqueueSnackbar } from 'notistack';

// Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Services
import { getAllRestaurants } from '@/services';

// Components
import ListingTable from './listing-table/listing-table';

// Helpers
import { getError } from '@/helpers';

// Utils
import { Status } from '@/utils/constants';

const RestaurantListing = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/allRestaurants',
    getAllRestaurants
  );

  if (error) {
    enqueueSnackbar({ variant: 'error', message: getError(error) });
  }

  // Initialize counts for each status to 0
  const initialCounts = Object.values(Status).reduce((acc, status) => {
    acc[status.value] = [];
    return acc;
  }, {});

  // Use the initialCounts to initialize transformedData
  const transformedData = (data?.data || []).reduce((acc, restaurant) => {
    const status = restaurant.status;

    if (status === Status.APPROVED.value && restaurant.isDeleted) {
      acc[Status.DELETED.value].push(restaurant);
    } else {
      acc[status].push(restaurant);
    }

    return acc;
  }, initialCounts);

  return (
    <DashboardContainer container columnSpacing={2} rowGap={1}>
      <Grid item xs={12}>
        <ListingTable
          allRestaurants={transformedData}
          loading={isLoading}
          refetchData={mutate}
        />
      </Grid>
    </DashboardContainer>
  );
};

export default RestaurantListing;
