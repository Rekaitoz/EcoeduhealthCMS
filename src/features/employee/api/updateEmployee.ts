import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Employee, EmployeeDTO } from '../types';

type EmployeeUpdateRequest = {
  id: number;
  data: EmployeeDTO;
};

export async function updateEmployee({ id, data }: EmployeeUpdateRequest) {
  const res = await axios.put<GeneralResponse<Employee>>(`/employee/${id}`, data);

  return res.data;
}

type UseUpdateEmployeeOptions = {
  config?: MutationConfig<typeof updateEmployee>;
};

export function useUpdateEmployee({ config }: UseUpdateEmployeeOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateEmployee,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
