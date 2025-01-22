import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Shift } from '../types';

type ShiftDeleteDTO = {
  id: number;
};

export async function deleteShift({ id }: ShiftDeleteDTO) {
  const res = await axios.delete<GeneralResponse<Shift>>(`/shift/${id}`);

  return res.data;
}

type UseDeleteShiftOptions = {
  config?: MutationConfig<typeof deleteShift>;
};

export function useDeleteShift({ config }: UseDeleteShiftOptions = {}) {
  return useMutation(deleteShift, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['shifts']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
