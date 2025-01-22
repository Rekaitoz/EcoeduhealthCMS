import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Product, ProductQuery } from '../../types';

type ProductsRequest = {
  params?: ProductQuery;
};

export async function getProducts({ params }: ProductsRequest) {
  const res = await axios.get<PaginatedResult<Product>>(`/product`, { params });

  return res.data;
}

type QueryFnType = typeof getProducts;

type UseProductsOptions = {
  params?: ProductQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useProducts({ config, params }: UseProductsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['products', params],
    queryFn: () => getProducts({ params }),
    placeholderData: keepPreviousData,
  });
}
