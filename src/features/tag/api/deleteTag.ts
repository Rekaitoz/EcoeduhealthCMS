import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { TagType } from '../types';

type TagDeleteRequest = {
  id: number;
};

export async function deleteTag({ id }: TagDeleteRequest) {
  const res = await axios.delete<GeneralResponse<TagType>>(`/tags/${id}`);

  return res.data;
}

type UseDeleteTagOptions = {
  config?: MutationConfig<typeof deleteTag>;
};

export function useDeleteTag({ config }: UseDeleteTagOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteTag,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
