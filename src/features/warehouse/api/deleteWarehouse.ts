import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Warehouse } from '../types';

type WarehouseDeleteDTO = {
  id: number;
};

export async function deleteWarehouse({ id }: WarehouseDeleteDTO) {
  const res = await axios.delete<GeneralResponse<Warehouse>>(`/warehouse/${id}`);

  return res.data;
}

type UseDeleteWarehouseOptions = {
  config?: MutationConfig<typeof deleteWarehouse>;
};

export function useDeleteWarehouse({ config }: UseDeleteWarehouseOptions = {}) {
  return useMutation(deleteWarehouse, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['warehouses']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
