import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type AdminRemoveRequest = {
  outletId: number;
  employeeId: number;
};

export async function removeAdmin({ outletId, employeeId }: AdminRemoveRequest) {
  const res = await axios.delete<GeneralResponse>(`/outlet/${outletId}/admin/${employeeId}`);

  return res.data;
}

type UseRemoveAdminOptions = {
  config?: MutationConfig<typeof removeAdmin>;
};

export function useRemoveAdmin({ config }: UseRemoveAdminOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: removeAdmin,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlet-admins'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
