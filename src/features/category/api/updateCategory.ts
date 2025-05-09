import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { CategoryType, CategoryDTO } from '../types';

type CategoryUpdateRequest = {
  id: number;
  data: CategoryDTO;
};

export async function updateCategory({ id, data }: CategoryUpdateRequest) {
  const res = await axios.put<GeneralResponse<CategoryType>>(`/categories/${id}`, data);

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
      queryClient.invalidateQueries({ queryKey: ['categorys'] });
      queryClient.invalidateQueries({ queryKey: ['category'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
