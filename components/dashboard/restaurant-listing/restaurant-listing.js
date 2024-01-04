import React from "react";

//Styles
import { DashboardContainer } from "@/components/UI";
import { Grid } from "@mui/material";

import ListingTable from "./listing-table/listing-table";

const RestaurantListing = () => {
  return (
    <DashboardContainer container columnSpacing={2} rowGap={1}>
      <Grid item xs={12}>
        <ListingTable />
      </Grid>
    </DashboardContainer>
  );
};

export default RestaurantListing;
