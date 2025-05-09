import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { CategoryType } from '../types';

type CategoryDeleteRequest = {
  id: number;
};

export async function deleteCategory({ id }: CategoryDeleteRequest) {
  const res = await axios.delete<GeneralResponse<CategoryType>>(`/categories/${id}`);

  return res.data;
}

type UseDeleteCategoryOptions = {
  config?: MutationConfig<typeof deleteCategory>;
};

export function useDeleteCategory({ config }: UseDeleteCategoryOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['categorys'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
