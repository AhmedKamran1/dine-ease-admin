import React from 'react';
import useSWR from 'swr';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Services
import {
  getAllRestaurants,
  getApprovedRestaurants,
  getPendingRestaurants,
} from '@/services';

// Components
import ListingTable from './listing-table/listing-table';

// Snackbar
import { enqueueSnackbar } from 'notistack';
import { getError } from '@/helpers/snackbarHelpers';

const RestaurantListing = () => {
  const {
    data: pendingRestaurants,
    error: pendingError,
    isLoading: loadPending,
    mutate: mutatePending,
  } = useSWR('/api/pendingRestaurants', getPendingRestaurants);

  const {
    data: approvedRestaurants,
    error: approvedError,
    isLoading: loadApproved,
    mutate: mutateApproved,
  } = useSWR('/api/approvedRestaurants', getApprovedRestaurants);

  const {
    data: allRestaurants,
    error: allError,
    isLoading: loadAll,
  } = useSWR('/api/allRestaurants', getAllRestaurants);

  const loading = loadPending && loadApproved && loadAll;

  if (pendingError || approvedError || allError) {
    enqueueSnackbar({
      variant: 'error',
      message: getError(pendingError || approvedError || allError),
    });
  }

  const refetchData = () => {
    mutatePending();
    mutateApproved();
  };

  return (
    <DashboardContainer container columnSpacing={2} rowGap={1}>
      <Grid item xs={12}>
        <ListingTable
          pendingRestaurants={pendingRestaurants}
          approvedRestaurants={approvedRestaurants}
          allRestaurants={allRestaurants}
          loading={loading}
          refetchData={refetchData}
        />
      </Grid>
    </DashboardContainer>
  );
};

export default RestaurantListing;
