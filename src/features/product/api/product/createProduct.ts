import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Product, ProductDTO } from '../../types';

type ProductCreateRequest = {
  data: ProductDTO;
};

export async function createProduct({ data }: ProductCreateRequest) {
  const res = await axios.post<GeneralResponse<Product>>(`/product`, data);

  return res.data;
}

type UseCreateProductOptions = {
  config?: MutationConfig<typeof createProduct>;
};

export function useCreateProduct({ config }: UseCreateProductOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
