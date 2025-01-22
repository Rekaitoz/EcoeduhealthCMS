import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Outlet, OutletDTO } from '../types';

type OutletCreateRequest = {
  data: OutletDTO;
};

export async function createOutlet({ data }: OutletCreateRequest) {
  const res = await axios.post<GeneralResponse<Outlet>>(`/outlet`, data);

  return res.data;
}

type UseCreateOutletOptions = {
  config?: MutationConfig<typeof createOutlet>;
};

export function useCreateOutlet({ config }: UseCreateOutletOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createOutlet,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlets'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
