import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Product, ProductDTO } from '../../types';

export type ProductUpdateRequest = {
  id: number;
  data: ProductDTO;
};

export async function updateProduct({ id, data }: ProductUpdateRequest) {
  const res = await axios.put<GeneralResponse<Product>>(`/product/${id}`, data);

  return res.data;
}

type UseUpdateProductOptions = {
  config?: MutationConfig<typeof updateProduct>;
};

export function useUpdateProduct({ config }: UseUpdateProductOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
