import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Category, CategoryDTO } from '../../types';

export type CategoryUpdateRequest = {
  id: number;
  data: CategoryDTO;
};

export async function updateCategory({ id, data }: CategoryUpdateRequest) {
  const res = await axios.put<GeneralResponse<Category>>(`/category/${id}`, data);

  return res.data;
}

type UseUpdateCategoryOptions = {
  config?: MutationConfig<typeof updateCategory>;
};

export function useUpdateCategory({ config }: UseUpdateCategoryOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
