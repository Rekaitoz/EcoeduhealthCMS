import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Warehouse, WarehouseRequest } from '../types';

type WarehouseCreateDTO = {
  data: WarehouseRequest;
};

export async function createWarehouse({ data }: WarehouseCreateDTO) {
  const res = await axios.post<GeneralResponse<Warehouse>>(`/warehouse`, data);

  return res.data;
}

type UseCreateWarehouseOptions = {
  config?: MutationConfig<typeof createWarehouse>;
};

export function useCreateWarehouse({ config }: UseCreateWarehouseOptions = {}) {
  return useMutation(createWarehouse, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['warehouses']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
