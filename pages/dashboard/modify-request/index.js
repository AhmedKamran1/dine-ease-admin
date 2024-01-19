import React from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';

const ModifyRequestPage = () => {
  return <div>ModifyRequest</div>;
};

ModifyRequestPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ModifyRequestPage;
