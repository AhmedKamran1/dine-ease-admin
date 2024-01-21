import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const PaymentPage = () => {
  return <div>PaymentPage</div>;
};

PaymentPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(PaymentPage);
