import { Center, Loader } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import storage from '@/utils/storage';

import { logout, useCreds } from '../api';
import { AuthContext } from '../contexts';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useCreds();
  const [params] = useSearchParams();
  const [load, setLoad] = useState(true);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = useMemo(
    () => ({
      creds: data ?? null,
      isLoading,
      logout: logoutMutation.mutateAsync,
    }),
    [data, logoutMutation.mutateAsync, isLoading]
  );

  useEffect(() => {
    if (isLoading) return;

    const token = params.get('token');

    if (token == null) return setLoad(false);

    storage.setToken(token);
    queryClient.invalidateQueries({ queryKey: ['creds'] });
    setLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isLoading]);

  if (isLoading || load || isFetching || logoutMutation.isPending)
    return (
      <Center className="w-full h-screen bg-body">
        <Loader />
      </Center>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
