import React from 'react';
import useSWR from 'swr';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Components
import LogsTable from './logs-table/logs-table';
import LogsPieChart from './logs-chart/logs-pie-chart';
import LogsLineChart from './logs-chart/logs-line-chart';

// Services
import { getRestaurantRecords } from '@/services';

const Logs = () => {
  // const { data: logs, error, isLoading } = useSWR('/api/records', getRestaurantRecords);

  // if (error) {
  //   enqueueSnackbar({
  //     variant: 'error',
  //     message: getError(error),
  //   });
  // }

  return (
    <DashboardContainer container columnSpacing={2} rowGap={1}>
      <Grid item xs={12} md={8}>
        <LogsLineChart logs={null} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LogsPieChart logs={null} />
      </Grid>
      <Grid item xs={12}>
        <LogsTable logs={null} loading={null} />
      </Grid>
    </DashboardContainer>
  );
};

export default Logs;
