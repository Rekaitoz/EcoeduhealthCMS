import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Outlet, OutletDTO } from '../types';

export type UpdateOutletDTO = {
  id: number;
  data: OutletDTO;
};

export async function updateOutlet({ id, data }: UpdateOutletDTO) {
  const res = await axios.put<GeneralResponse<Outlet>>(`/outlet/${id}`, data);

  return res.data;
}

type UseUpdateOutletOptions = {
  config?: MutationConfig<typeof updateOutlet>;
};

export function useUpdateOutlet({ config }: UseUpdateOutletOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateOutlet,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlets'] });
      queryClient.invalidateQueries({ queryKey: ['outlet'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
