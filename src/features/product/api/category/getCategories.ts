import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Category, CategoryQuery } from '../../types';

type CategoriesRequest = {
  params?: CategoryQuery;
};

export async function getCategories({ params }: CategoriesRequest) {
  const res = await axios.get<PaginatedResult<Category>>(`/category`, { params });

  return res.data;
}

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
  params?: CategoryQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useCategories({ config, params }: UseCategoriesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['categories', params],
    queryFn: () => getCategories({ params }),
    placeholderData: keepPreviousData,
  });
}
