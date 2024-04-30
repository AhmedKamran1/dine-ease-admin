import React from 'react';
import { useRouter } from 'next/router';

import Login from '@/components/login/login';

const LoginPage = () => {
  const router = useRouter();
  const token = localStorage.getItem('token');

  if (token) {
    router.push('/dashboard/restaurant-listing');
    return;
  }

  return <Login />;
};

export default LoginPage;
