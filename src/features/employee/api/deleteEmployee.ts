import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Employee } from '../types';

type EmployeeDeleteRequest = {
  id: number;
};

export async function deleteEmployee({ id }: EmployeeDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Employee>>(`/employee/${id}`);

  return res.data;
}

type UseDeleteEmployeeOptions = {
  config?: MutationConfig<typeof deleteEmployee>;
};

export function useDeleteEmployee({ config }: UseDeleteEmployeeOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteEmployee,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
