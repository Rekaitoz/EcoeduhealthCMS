import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Employee } from '@/features/employee';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { ResultResponse } from '@/types/api';

type OutletsRequest = {
  id: number;
};

export async function getAdmins({ id }: OutletsRequest) {
  const res = await axios.get<ResultResponse<Employee>>(`/outlet/${id}/admin`);

  return res.data;
}

type QueryFnType = typeof getAdmins;

type UseOutletsOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useOutletAdmins({ config, id }: UseOutletsOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['outlet-admins', id],
    queryFn: () => getAdmins({ id }),
    placeholderData: keepPreviousData,
  });
}
