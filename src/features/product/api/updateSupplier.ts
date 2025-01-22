import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Supplier, SupplierDTO } from '../types';

export type SupplierUpdateRequest = {
  id: number;
  data: SupplierDTO;
};

export async function updateSupplier({ id, data }: SupplierUpdateRequest) {
  const res = await axios.put<GeneralResponse<Supplier>>(`/supplier/${id}`, data);

  return res.data;
}

type UseUpdateSupplierOptions = {
  config?: MutationConfig<typeof updateSupplier>;
};

export function useUpdateSupplier({ config }: UseUpdateSupplierOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateSupplier,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['supplier'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
