import React from 'react'

import DashboardLayout from '@/components/layout/dashboard-layout';

const OverviewPage = () => {
  return (
    <div>OverviewPage</div>
  )
}

OverviewPage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
  };

export default OverviewPage