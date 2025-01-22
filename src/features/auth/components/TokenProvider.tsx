import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export const TokenProvider: React.FC<Props> = ({ children }) => {
  const { creds, authenticate } = useAuth();
  const [params] = useSearchParams();

  useEffect(() => {
    if (creds != null) return;

    const token = params.get('token');

    if (token == null) return;

    authenticate(token);
  }, [params, creds, authenticate]);

  return <>{children}</>;
};
