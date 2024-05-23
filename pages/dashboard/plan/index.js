import React from 'react';
import PaymentPlans from '@/components/dashboard/payment-plans/payment-plans';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const PaymentPlansPage = () => {
  return <PaymentPlans />;
};

PaymentPlansPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(PaymentPlansPage);
