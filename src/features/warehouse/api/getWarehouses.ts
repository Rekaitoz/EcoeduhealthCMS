import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Warehouse, WarehouseQuery } from '../types';

type WarehousesDTO = {
  params?: WarehouseQuery;
};

export async function getWarehouses({ params }: WarehousesDTO) {
  const res = await axios.get<PaginatedResult<Warehouse>>(`/warehouse`, { params });

  return res.data;
}

type QueryFnType = typeof getWarehouses;

type UseWarehousesOptions = {
  params?: WarehouseQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useWarehouses({ config, params }: UseWarehousesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['warehouses', params],
    queryFn: () => getWarehouses({ params }),
    keepPreviousData: true,
  });
}
