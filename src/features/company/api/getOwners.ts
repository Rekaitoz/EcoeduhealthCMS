import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { User } from '@/features/user';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { ResultResponse } from '@/types/api';

type CompanysDTO = {
  id: number;
};

export async function getOwners({ id }: CompanysDTO) {
  const res = await axios.get<ResultResponse<User>>(`/company/${id}/owner`);

  return res.data;
}

type QueryFnType = typeof getOwners;

type UseCompanysOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useCompanyOwners({ config, id }: UseCompanysOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['company-owners', id],
    queryFn: () => getOwners({ id }),
    placeholderData: keepPreviousData,
  });
}
