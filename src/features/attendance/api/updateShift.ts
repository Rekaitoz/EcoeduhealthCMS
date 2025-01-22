import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Shift, ShiftRequest } from '../types';

export type UpdateShiftDTO = {
  id: number;
  data: ShiftRequest;
};

export async function updateShift({ id, data }: UpdateShiftDTO) {
  const res = await axios.put<GeneralResponse<Shift>>(`/shift/${id}`, data);

  return res.data;
}

type UseUpdateShiftOptions = {
  config?: MutationConfig<typeof updateShift>;
};

export function useUpdateShift({ config }: UseUpdateShiftOptions = {}) {
  return useMutation(updateShift, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['shifts']);
      queryClient.invalidateQueries(['shift', args[1].id]);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
