import { useContext } from 'react';

import { Role } from '@/features/user';
import { queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';

import { AuthContext } from '../contexts';

export const useAuth = () => {
  const { creds, ...ctx } = useContext(AuthContext);

  function authenticate(token: string) {
    storage.setToken(token);
    queryClient.invalidateQueries({ queryKey: ['creds'] });
  }

  function isPermitted(role: Array<Role | `-${Role}`>) {
    return role.reduce((prev, curr) => {
      const isExcept = curr.startsWith('-');
      const role = isExcept ? curr.slice(1) : curr;

      return prev || isExcept ? creds?.role != role : creds?.role == role;
    }, false);
  }

  return { creds, ...ctx, authenticate, isPermitted };
};
