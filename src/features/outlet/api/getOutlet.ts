import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Outlet } from '../types';

type OutletRequest = {
  id: number | string;
};

export async function getOutlet({ id }: OutletRequest) {
  const res = await axios.get<Outlet>(`/outlet/${id}`);

  return res.data;
}

type QueryFnType = typeof getOutlet;

type UseOutletOptions = {
  id: number | string;
  config?: QueryConfig<QueryFnType>;
};

export function useOutlet({ config, id }: UseOutletOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['outlet', id],
    queryFn: () => getOutlet({ id }),
  });
}
