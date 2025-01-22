import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Shift, ShiftRequest } from '../types';

type ShiftCreateDTO = {
  data: ShiftRequest;
};

export async function createShift({ data }: ShiftCreateDTO) {
  const res = await axios.post<GeneralResponse<Shift>>(`/shift`, data);

  return res.data;
}

type UseCreateShiftOptions = {
  config?: MutationConfig<typeof createShift>;
};

export function useCreateShift({ config }: UseCreateShiftOptions = {}) {
  return useMutation(createShift, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['shifts']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
