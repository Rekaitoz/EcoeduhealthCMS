import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { TagType, TagDTO } from '../types';

type TagUpdateRequest = {
  id: number;
  data: TagDTO;
};

export async function updateTag({ id, data }: TagUpdateRequest) {
  const res = await axios.put<GeneralResponse<TagType>>(`/tags/${id}`, data);

  return res.data;
}

type UseUpdateTagOptions = {
  config?: MutationConfig<typeof updateTag>;
};

export function useUpdateTag({ config }: UseUpdateTagOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateTag,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      queryClient.invalidateQueries({ queryKey: ['tag'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
