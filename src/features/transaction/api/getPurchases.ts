import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Purchase, PurchaseQuery } from '../types';

type PurchasesDTO = {
  params?: PurchaseQuery;
};

export async function getPurchases({ params }: PurchasesDTO) {
  const res = await axios.get<PaginatedResult<Purchase>>(`/purchase`, { params });

  return res.data;
}

type QueryFnType = typeof getPurchases;

type UsePurchasesOptions = {
  params?: PurchaseQuery;
  config?: QueryConfig<QueryFnType>;
};

export function usePurchases({ config, params }: UsePurchasesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['purchases', params],
    queryFn: () => getPurchases({ params }),
    keepPreviousData: true,
  });
}
