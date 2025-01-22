import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Supplier, SupplierQuery } from '../types';

type SuppliersRequest = {
  params?: SupplierQuery;
};

export async function getSuppliers({ params }: SuppliersRequest) {
  const res = await axios.get<PaginatedResult<Supplier>>(`/supplier`, { params });

  return res.data;
}

type QueryFnType = typeof getSuppliers;

type UseSuppliersOptions = {
  params?: SupplierQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useSuppliers({ config, params }: UseSuppliersOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['suppliers', params],
    queryFn: () => getSuppliers({ params }),
    placeholderData: keepPreviousData,
  });
}
