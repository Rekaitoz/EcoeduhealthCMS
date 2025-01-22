import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Outlet } from '../types';

type OutletDeleteRequest = {
  id: number;
};

export async function deleteOutlet({ id }: OutletDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Outlet>>(`/outlet/${id}`);

  return res.data;
}

type UseDeleteOutletOptions = {
  config?: MutationConfig<typeof deleteOutlet>;
};

export function useDeleteOutlet({ config }: UseDeleteOutletOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteOutlet,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlets'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
