import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import { Grid } from '@mui/material';
import { DashboardContainer } from '@/components/UI';

// Helpers
import { getError } from '@/helpers';

// Services
import { getAllModificationRequests } from '@/services';

import RequestTable from './request-table/request-table';

const ModifyRequest = () => {
  const [requests, setRequests] = useState([]);

  const fetchModificationRequests = async () => {
    try {
      const response = await getAllModificationRequests();
      setRequests(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchModificationRequests();
  }, []);

  return (
    <DashboardContainer container columnSpacing={1} rowGap={1}>
      <Grid item xs={12}>
        <RequestTable requests={requests} />
      </Grid>
    </DashboardContainer>
  );
};

export default ModifyRequest;
