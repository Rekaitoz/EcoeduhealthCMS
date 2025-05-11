import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Article } from '../types';

// import { Article, ArticleDTO } from '../../types';

export type ArticleUpdateRearticle = {
  id: number;
  data: FormData;
};

export async function updateArticle({ id, data }: ArticleUpdateRearticle) {
  const res = await axios.post<GeneralResponse<Article>>(`/articles/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

type UseUpdateArticleOptions = {
  config?: MutationConfig<typeof updateArticle>;
};

export function useUpdateArticle({ config }: UseUpdateArticleOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateArticle,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
