import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Article } from '../types';

// import { Article, ArticleDTO } from '../../types';

type ArticleCreateRearticle = {
  data: FormData;
};

export async function createArticle({ data }: ArticleCreateRearticle) {
  const res = await axios.post<GeneralResponse<Article>>(`/articles`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
}

type UseCreateArticleOptions = {
  config?: MutationConfig<typeof createArticle>;
};

export function useCreateArticle({ config }: UseCreateArticleOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createArticle,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
