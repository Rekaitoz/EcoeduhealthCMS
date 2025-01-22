import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Employee, EmployeeDTO } from '../types';

type EmployeeCreateRequest = {
  data: EmployeeDTO;
};

export async function createEmployee({ data }: EmployeeCreateRequest) {
  const res = await axios.post<GeneralResponse<Employee>>(`/employee`, data);

  return res.data;
}

type UseCreateEmployeeOptions = {
  config?: MutationConfig<typeof createEmployee>;
};

export function useCreateEmployee({ config }: UseCreateEmployeeOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createEmployee,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
