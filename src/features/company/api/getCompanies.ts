import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Company, CompanyQuery } from '../types';

type CompaniesRequest = {
  params?: CompanyQuery;
};

export async function getCompanies({ params }: CompaniesRequest) {
  const res = await axios.get<PaginatedResult<Company>>(`/company`, { params });

  return res.data;
}

type QueryFnType = typeof getCompanies;

type UseCompaniesOptions = {
  params?: CompanyQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useCompanies({ config, params }: UseCompaniesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['companies', params],
    queryFn: () => getCompanies({ params }),
    placeholderData: keepPreviousData,
  });
}
