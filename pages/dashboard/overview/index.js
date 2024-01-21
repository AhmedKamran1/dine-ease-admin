import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const OverviewPage = () => {
  return <div>OverviewPage</div>;
};

OverviewPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(OverviewPage);
