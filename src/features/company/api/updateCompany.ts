import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Company, CompanyDTO } from '../types';

export type UpdateCompanyDTO = {
  id: number;
  data: CompanyDTO;
};

export async function updateCompany({ id, data }: UpdateCompanyDTO) {
  const res = await axios.put<GeneralResponse<Company>>(`/company/${id}`, data);

  return res.data;
}

type UseUpdateCompanyOptions = {
  config?: MutationConfig<typeof updateCompany>;
};

export function useUpdateCompany({ config }: UseUpdateCompanyOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateCompany,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      queryClient.invalidateQueries({ queryKey: ['company'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
