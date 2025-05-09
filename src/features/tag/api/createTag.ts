import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { TagType, TagDTO } from '../types';

type TagCreateRequest = {
  data: TagDTO;
};

export async function createTag({ data }: TagCreateRequest) {
  const res = await axios.post<GeneralResponse<TagType>>(`/tags`, data);

  return res.data;
}

type UseCreateTagOptions = {
  config?: MutationConfig<typeof createTag>;
};

export function useCreateTag({ config }: UseCreateTagOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createTag,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
