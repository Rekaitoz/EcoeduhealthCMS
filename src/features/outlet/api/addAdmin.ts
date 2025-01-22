import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type AdminAddRequest = {
  outletId: number;
  employeeId: number;
};

export async function addAdmin({ outletId, employeeId }: AdminAddRequest) {
  const res = await axios.put<GeneralResponse>(`/outlet/${outletId}/admin/${employeeId}`);

  return res.data;
}

type UseAddAdminOptions = {
  config?: MutationConfig<typeof addAdmin>;
};

export function useAddAdmin({ config }: UseAddAdminOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: addAdmin,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlet-admins'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
