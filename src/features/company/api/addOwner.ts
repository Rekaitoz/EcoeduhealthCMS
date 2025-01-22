import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type AddOwnerRequest = {
  companyId: number;
  userId: number;
};

export async function addOwner({ companyId, userId }: AddOwnerRequest) {
  const res = await axios.put<GeneralResponse>(`/company/${companyId}/owner/${userId}`);

  return res.data;
}

type UseAddOwnerOptions = {
  config?: MutationConfig<typeof addOwner>;
};

export function useAddOwner({ config }: UseAddOwnerOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: addOwner,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['company-owners'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
