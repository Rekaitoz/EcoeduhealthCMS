import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';

export const AppLayout: React.FC = () => {
  const { creds } = useAuth();

  if (!creds) return <Navigate to="/login" replace />;

  return (
    <>
      <Outlet />
    </>
  );
};
