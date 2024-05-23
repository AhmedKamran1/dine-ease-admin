import React from 'react';
import Overview from '@/components/dashboard/overview/overview';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const OverviewPage = () => {
  return <Overview />;
};

OverviewPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(OverviewPage);
