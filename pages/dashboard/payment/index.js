import React from 'react';
import PaymentHistory from '@/components/dashboard/payment-history/payment-history.js';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const PaymentHistoryPage = () => {
  return <PaymentHistory />;
};

PaymentHistoryPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(PaymentHistoryPage);
