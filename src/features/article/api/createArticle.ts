import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Article, ArticleDTO } from '../types';

// import { Article, ArticleDTO } from '../../types';

type ArticleCreateRearticle = {
  data: ArticleDTO;
};

export async function createArticle({ data }: ArticleCreateRearticle) {
  console.log(data);

  const res = await axios.post<GeneralResponse<Article>>(`/articles`, data, {});

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
