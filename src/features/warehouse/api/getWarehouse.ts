import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Warehouse } from '../types';

type WarehouseDTO = {
  id: number;
};

export async function getWarehouse({ id }: WarehouseDTO) {
  const res = await axios.get<Warehouse>(`/warehouse/${id}`);

  return res.data;
}

type QueryFnType = typeof getWarehouse;

type UseWarehouseOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useWarehouse({ config, id }: UseWarehouseOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['warehouse', id],
    queryFn: () => getWarehouse({ id }),
  });
}
