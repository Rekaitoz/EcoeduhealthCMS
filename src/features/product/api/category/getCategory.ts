import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Category } from '../../types';

type CategoryRequest = {
  id: number;
};

export async function getCategory({ id }: CategoryRequest) {
  const res = await axios.get<Category>(`/category/${id}`);

  return res.data;
}

type QueryFnType = typeof getCategory;

type UseCategoryOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useCategory({ config, id }: UseCategoryOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['category', id],
    queryFn: () => getCategory({ id }),
  });
}
