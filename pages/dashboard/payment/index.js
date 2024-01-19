import React from 'react';

import DashboardLayout from '@/components/layout/dashboard-layout';

const PaymentPage = () => {
  return <div>PaymentPage</div>;
};

PaymentPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default PaymentPage;
