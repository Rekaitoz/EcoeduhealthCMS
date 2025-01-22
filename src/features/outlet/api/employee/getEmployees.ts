import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { OutletEmployee, OutletEmployeeQuery } from '../../types';

type OutletEmployeesRequest = {
  id: number | string;
  params?: OutletEmployeeQuery;
};

export async function getOutletEmployees({ id, params }: OutletEmployeesRequest) {
  const res = await axios.get<PaginatedResult<OutletEmployee>>(`/outlet/${id}/employee`, {
    params,
  });

  return res.data;
}

type QueryFnType = typeof getOutletEmployees;

type UseOutletEmployeesOptions = {
  id: number | string;
  params?: OutletEmployeeQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useOutletEmployees({ id, config, params }: UseOutletEmployeesOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['outlet-employees', params],
    queryFn: () => getOutletEmployees({ id, params }),
    placeholderData: keepPreviousData,
  });
}
