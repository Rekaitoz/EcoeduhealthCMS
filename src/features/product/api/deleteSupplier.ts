import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Supplier } from '../types';

type SupplierDeleteRequest = {
  id: number;
};

export async function deleteSupplier({ id }: SupplierDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Supplier>>(`/supplier/${id}`);

  return res.data;
}

type UseDeleteSupplierOptions = {
  config?: MutationConfig<typeof deleteSupplier>;
};

export function useDeleteSupplier({ config }: UseDeleteSupplierOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteSupplier,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
