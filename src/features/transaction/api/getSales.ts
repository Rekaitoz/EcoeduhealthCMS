import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Sale, SaleQuery } from '../types';

type SalesDTO = {
  params?: SaleQuery;
};

export async function getSales({ params }: SalesDTO) {
  const res = await axios.get<PaginatedResult<Sale>>(`/sale`, { params });

  return res.data;
}

type QueryFnType = typeof getSales;

type UseSalesOptions = {
  params?: SaleQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useSales({ config, params }: UseSalesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['sales', params],
    queryFn: () => getSales({ params }),
    keepPreviousData: true,
  });
}
