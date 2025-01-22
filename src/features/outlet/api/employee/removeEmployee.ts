import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type EmployeeRemoveRequest = {
  outletId: number;
  employeeId: number;
};

export async function removeEmployee({ outletId, employeeId }: EmployeeRemoveRequest) {
  const res = await axios.delete<GeneralResponse>(`/outlet/${outletId}/employee/${employeeId}`);

  return res.data;
}

type UseRemoveEmployeeOptions = {
  config?: MutationConfig<typeof removeEmployee>;
};

export function useRemoveEmployee({ config }: UseRemoveEmployeeOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: removeEmployee,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlet-employees'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
