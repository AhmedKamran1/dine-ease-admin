import React from 'react';
import ModifyRequest from '@/components/dashboard/modify-request/modify-request';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const ModifyRequestPage = () => {
  return <ModifyRequest />;
};

ModifyRequestPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(ModifyRequestPage);
