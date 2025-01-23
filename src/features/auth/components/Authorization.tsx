import { User } from '@/features/user';

import { useAuth } from '../hooks';

type Props = {
  role: User['role'][];
  children: React.ReactNode;
};

export const Authorization: React.FC<Props> = ({ role, children }) => {
  const { creds } = useAuth();

  if (role.includes(creds?.role ?? 'user')) return null;

  return <>{children}</>;
};
