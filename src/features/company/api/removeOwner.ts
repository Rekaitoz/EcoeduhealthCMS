import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type RemoveOwnerDTO = {
  companyId: number;
  userId: number;
};

export async function removeOwner({ companyId, userId }: RemoveOwnerDTO) {
  const res = await axios.delete<GeneralResponse>(`/company/${companyId}/owner/${userId}`);

  return res.data;
}

type UseRemoveOwnerOptions = {
  config?: MutationConfig<typeof removeOwner>;
};

export function useRemoveOwner({ config }: UseRemoveOwnerOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: removeOwner,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['company-owners'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
