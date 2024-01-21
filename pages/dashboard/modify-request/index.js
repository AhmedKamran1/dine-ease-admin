import React from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import withAuth from '@/components/auth/with-auth';

const ModifyRequestPage = () => {
  return <div>ModifyRequest</div>;
};

ModifyRequestPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAuth(ModifyRequestPage);
