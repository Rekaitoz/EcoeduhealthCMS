import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Supplier, SupplierDTO } from '../types';

type SupplierCreateRequest = {
  data: SupplierDTO;
};

export async function createSupplier({ data }: SupplierCreateRequest) {
  const res = await axios.post<GeneralResponse<Supplier>>(`/supplier`, data);

  return res.data;
}

type UseCreateSupplierOptions = {
  config?: MutationConfig<typeof createSupplier>;
};

export function useCreateSupplier({ config }: UseCreateSupplierOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createSupplier,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
