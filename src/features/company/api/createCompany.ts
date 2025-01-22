import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Company, CompanyDTO } from '../types';

type CompanyCreateRequest = {
  data: CompanyDTO;
};

export async function createCompany({ data }: CompanyCreateRequest) {
  const res = await axios.post<GeneralResponse<Company>>(`/company`, data);

  return res.data;
}

type UseCreateCompanyOptions = {
  config?: MutationConfig<typeof createCompany>;
};

export function useCreateCompany({ config }: UseCreateCompanyOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createCompany,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
