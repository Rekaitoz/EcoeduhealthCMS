import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { CategoryType, CategoryDTO } from '../types';

type CategoryCreateRequest = {
  data: CategoryDTO;
};

export async function createCategory({ data }: CategoryCreateRequest) {
  const res = await axios.post<GeneralResponse<CategoryType>>(`/categories`, data);

  return res.data;
}

type UseCreateCategoryOptions = {
  config?: MutationConfig<typeof createCategory>;
};

export function useCreateCategory({ config }: UseCreateCategoryOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createCategory,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['categorys'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
