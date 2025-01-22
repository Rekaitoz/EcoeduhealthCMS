import { Center, Loader } from '@mantine/core';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

const LoadingScreen = () => (
  <Center className="w-full h-screen bg-body">
    <Loader />
  </Center>
);

export const AuthLayout: React.FC = () => {
  const { creds } = useAuth();

  if (creds) return <Navigate to="/" replace />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </Suspense>
  );
};
