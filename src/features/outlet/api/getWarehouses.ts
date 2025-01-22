import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Warehouse } from '@/features/warehouse';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { ResultResponse } from '@/types/api';

type OutletsRequest = {
  id: number;
};

export async function getWarehouses({ id }: OutletsRequest) {
  const res = await axios.get<ResultResponse<Warehouse>>(`/outlet/${id}/warehouse`);

  return res.data;
}

type QueryFnType = typeof getWarehouses;

type UseOutletsOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useOutletWarehouses({ config, id }: UseOutletsOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['outlet-warehouses', id],
    queryFn: () => getWarehouses({ id }),
    placeholderData: keepPreviousData,
  });
}
