import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { OutletEmployeeDTO } from '../../types';

type EmployeeAddRequest = {
  outletId: number;
  employeeId: number;
  data: OutletEmployeeDTO;
};

export async function addEmployee({ outletId, employeeId, data }: EmployeeAddRequest) {
  const res = await axios.put<GeneralResponse>(`/outlet/${outletId}/employee/${employeeId}`, data);

  return res.data;
}

type UseAddEmployeeOptions = {
  config?: MutationConfig<typeof addEmployee>;
};

export function useSaveEmployee({ config }: UseAddEmployeeOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: addEmployee,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlet-employees'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
