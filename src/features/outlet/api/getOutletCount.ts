import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { OutletCount, OutletCountQuery } from '../types';

type OutletCountRequest = {
  params?: OutletCountQuery;
};

export async function getOutletCount({ params }: OutletCountRequest) {
  const res = await axios.get<OutletCount>(`/outlet/count`, { params });

  return res.data;
}

type QueryFnType = typeof getOutletCount;

type UseOutletCountOptions = {
  params?: OutletCountQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useOutletCount({ config, params }: UseOutletCountOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['outlet-count', params],
    queryFn: () => getOutletCount({ params }),
    placeholderData: keepPreviousData,
  });
}
