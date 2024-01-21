import React from 'react';
import withAuth from '@/components/auth/with-auth';
import DashboardLayout from '@/components/layout/dashboard-layout';
import Logs from '@/components/dashboard/logs/logs';

const LogsPage = () => {
  return <Logs />;
};

LogsPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(LogsPage);
