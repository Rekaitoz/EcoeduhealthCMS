import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Article } from '../types';

type ArticleDeleteRequest = {
  id: number;
};

export async function deleteArticle({ id }: ArticleDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Article>>(`/articles/${id}`);

  return res.data;
}

type UseDeleteArticleOptions = {
  config?: MutationConfig<typeof deleteArticle>;
};

export function useDeleteArticle({ config }: UseDeleteArticleOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteArticle,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
