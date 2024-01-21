import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

const withAuth = (WrappedComponent, options = {}) => {
  const AuthGuard = (props) => {
    const { role = 'Admin', redirect = '/login' } = options;
    const router = useRouter();
    const user = useSelector(selectUserState);

    const checkAuth = useCallback(() => {
      if (role !== user.role) {
        router.push(redirect);
      }
    }, [router, user.role, role, redirect]);

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    return role === user.role ? <WrappedComponent {...props} /> : null;
  };

  AuthGuard.getLayout = WrappedComponent.getLayout;
  return AuthGuard;
};

export default withAuth;
