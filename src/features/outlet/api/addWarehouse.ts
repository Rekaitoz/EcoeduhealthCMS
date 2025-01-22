import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type WarehouseAddRequest = {
  outletId: number;
  warehouseId: number;
};

export async function addWarehouse({ outletId, warehouseId }: WarehouseAddRequest) {
  const res = await axios.put<GeneralResponse>(`/outlet/${outletId}/warehouse/${warehouseId}`);

  return res.data;
}

type UseAddWarehouseOptions = {
  config?: MutationConfig<typeof addWarehouse>;
};

export function useAddWarehouse({ config }: UseAddWarehouseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: addWarehouse,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlet-warehouses'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
