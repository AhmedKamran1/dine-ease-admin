import React from 'react';

import RestaurantListing from '@/components/dashboard/restaurant-listing/restaurant-listing';
import DashboardLayout from '@/components/layout/dashboard-layout';

const RestaurantListingPage = () => {
  return <RestaurantListing />;
};

RestaurantListingPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default RestaurantListingPage;
