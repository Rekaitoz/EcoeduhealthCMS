import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { User, UserQuery } from '../types';

type UsersDTO = {
  params?: UserQuery;
};

export async function getUsers({ params }: UsersDTO) {
  const res = await axios.get<PaginatedResult<User>>('/user', { params });

  return res.data;
}

type QueryFnType = typeof getUsers;

type UseUsersOptions = {
  params?: UserQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useUsers({ config, params }: UseUsersOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['users', params],
    queryFn: () => getUsers({ params }),
    placeholderData: keepPreviousData,
  });
}
