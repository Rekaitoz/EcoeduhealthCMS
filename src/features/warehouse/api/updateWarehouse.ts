import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Warehouse, WarehouseRequest } from '../types';

export type UpdateWarehouseDTO = {
  id: number;
  data: WarehouseRequest;
};

export async function updateWarehouse({ id, data }: UpdateWarehouseDTO) {
  const res = await axios.put<GeneralResponse<Warehouse>>(`/warehouse/${id}`, data);

  return res.data;
}

type UseUpdateWarehouseOptions = {
  config?: MutationConfig<typeof updateWarehouse>;
};

export function useUpdateWarehouse({ config }: UseUpdateWarehouseOptions = {}) {
  return useMutation(updateWarehouse, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['warehouses']);
      queryClient.invalidateQueries(['warehouse', args[1].id]);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
