import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { CategoryType, CategoryQuery } from '../types';

type CategorysRequest = {
  params?: CategoryQuery;
};

type CategorysResponse = {
  data: PaginatedResult<CategoryType>;
};

export async function getCategorys({ params }: CategorysRequest) {
  const res = await axios.get<CategorysResponse>(`/categories`, { params });
  return res.data.data;
}

type QueryFnType = typeof getCategorys;

type UseCategorysOptions = {
  params?: CategoryQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useCategorys({ config, params }: UseCategorysOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['categorys', params],
    queryFn: () => getCategorys({ params }),
    placeholderData: keepPreviousData,
  });
}
