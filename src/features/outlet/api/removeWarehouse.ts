import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

type WarehouseRemoveDTO = {
  outletId: number;
  warehouseId: number;
};

export async function removeWarehouse({ outletId, warehouseId }: WarehouseRemoveDTO) {
  const res = await axios.delete<GeneralResponse>(`/outlet/${outletId}/warehouse/${warehouseId}`);

  return res.data;
}

type UseRemoveWarehouseOptions = {
  config?: MutationConfig<typeof removeWarehouse>;
};

export function useRemoveWarehouse({ config }: UseRemoveWarehouseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: removeWarehouse,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['outlet-warehouses'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
