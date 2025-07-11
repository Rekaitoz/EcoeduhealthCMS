import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

// import { Article } from '../../types';

type ArticleRearticle = {
  id: number;
};

export async function getArticle({ id }: ArticleRearticle) {
  const res = await axios.get<any>(`/articles/${id}`);

  return res.data;
}

type QueryFnType = typeof getArticle;

type UseArticleOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useArticle({ config, id }: UseArticleOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['article', id],
    queryFn: () => getArticle({ id }),
  });
}
