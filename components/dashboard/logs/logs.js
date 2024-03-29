import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Components
import LogsTable from './logs-table/logs-table';
import LogsPieChart from './logs-chart/logs-pie-chart';
import LogsLineChart from './logs-chart/logs-line-chart';

// Services
import { getAllRecords } from '@/services';
import { getError } from '@/helpers';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await getAllRecords();
      setLogs(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <DashboardContainer container columnSpacing={1} rowGap={1}>
      <Grid item xs={12} md={8}>
        <LogsLineChart logs={logs} />
      </Grid>
      <Grid item xs={12} md={4}>
        <LogsPieChart logs={logs} />
      </Grid>
      <Grid item xs={12}>
        <LogsTable logs={logs} loading={null} />
      </Grid>
    </DashboardContainer>
  );
};

export default Logs;
