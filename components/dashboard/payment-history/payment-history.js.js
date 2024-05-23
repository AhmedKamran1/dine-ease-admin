import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Services
import { getAllSubscriptions } from '@/services';
import { getError } from '@/helpers';

// Components
import PaymentsTable from './payments-table/payments-table';
import PaymentsLineChart from './payment-history-chart/payment-history-chart';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await getAllSubscriptions();
      setPayments(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <DashboardContainer container columnSpacing={1} rowGap={1}>
      <Grid item xs={12}>
        <PaymentsLineChart payments={payments} />
      </Grid>
      <Grid item xs={12}>
        <PaymentsTable payments={payments} />
      </Grid>
    </DashboardContainer>
  );
};

export default PaymentHistory;
